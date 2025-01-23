# RASPBERRYQL #
### A simple, extensible interface to a Raspberry Pi's GPIO via GraphQL ###

This project provides basic read and write access to the GPIO pins of a Raspberry Pi via an Apollo GraphQL server.

### Basic Usage ###
Pins must be registered before use. This is handled by the `registerPin` mutation which takes a pin name and a direction (which is an `Enum: IN | OUT`). To set an output pin's state use the `setState` mutation; to read an input pin's state, use the `state` query. A simple example in Python follows (assume a microswitch is connected to pin 17 and an LED to pin 21):

```python
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
from graphql import DocumentNode

# Assume pin 17 is connected to a microswitch and pin 21 to an LED
QUERIES: dict[str, DocumentNode] = {
    "register": gql(
        """
        mutation registerPin($pinName: String!, $direction: Direction!) {
            registerPin(pinName: $pinName, direction: $direction)
        }
"""
    ),
    "read_microswitch": gql(
        """
        query getState {
            state(pinName: "GPIO17")
        }
"""
    ),
    "led_on": gql(
        """
        mutation turnOn {
            setState(pinName: "GPIO21",state: true)
        }
"""
    ),
}


def main() -> None:
    print("main")
    transport = AIOHTTPTransport(url="https://<Your IP here>:4000/")
    client = Client(transport=transport, fetch_schema_from_transport=True)

    # set up pins 17 (output) and 21 (input)
    client.execute(
        QUERIES["register"], variable_values={"pinName": "GPIO21", "direction": "OUT"}
    )

    client.execute(
        QUERIES["register"], variable_values={"pinName": "GPIO17", "direction": "IN"}
    )

    # read the state of the microswitch. Depending on whether # it is pulled up or down, True and False will represent open and closed (or vice versa) 
    result = client.execute(QUERIES["read_microswitch"])
    print(result)

    # turn the LED on
    result = client.execute(QUERIES["led_on"])
    print(result)


if __name__ == "__main__":
    main()
```

### Configuration ###

There are two main configuration files, one mandatory (the server configuration) and the other optional (default pin registrations). Both are to be found in the `config` top-level directory.

The server configuration file is named `config.json`. It has three fields, thus:

```json
{
  "expressPort": <integer, the port where the server listens>,
  "sslKeyPath": <string, path to the server's SSL key file>,
  "sslCertificatePath": <string, path to the server's SSL certificate file>
}
```

The pin registrations file is named `defaultPins.json`. It consists of an array of pin names and directions of pins that should be pre-registered at startup, thus:

```json
[
  {
    "pinName": "GPIOxx",
    "direction": "out"
  },
  {
    "pinName": "GPIOyy",
    "direction": "in"
  }
]
```
where `GPIOxx` etc are pin names such as `GPIO13`.

### Notes ###

The server is written in TypeScript and uses version 4 of the Apollo software. It was written on a Raspberry Pi 4 Model B+ with 8 GB of RAM, running Raspberry Pi OS 12 (which is essentially Debian 12 Bookworm).

The server is not particularly fast, as the underlying transport is usually HTTP and each query or mutation necessitates a round trip. You can probably expect a maximum of about 50 calls per second. It is primarily designed for slowly-varying insrumtation like, say, a weather station. The initial reason for creating the project was to provide a simple backend to a React app running on the Pi to read and write to the GPIO.

The project uses the `onoff` node package to communicate with the Pi. Recent changes in how the GPIO is accessed from user space mean that standard pin numbers (whether Broadcom or WiringPi) do not work as is. I have created a simple class, `PinMapper`, that lazily reads kernel debug info to obtain the canonical pin number (for example, `GPIO5` might correspond to `gpio-517` and it is this number, 517, that `onoff` is expecting). The server expects queries to use the normal `GPIOxx` pin names.
