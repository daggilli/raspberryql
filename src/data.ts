'use strict';
import { Book, Animal } from './interfaces.js';
export const books: Book[] = [
  {
    title: '1984',
    author: 'George Orwell',
  },
  {
    title: 'The Gulag Archipelago',
    author: 'Aleksandr Solzhenitsyn',
  },
];

export const animals: Animal[] = [
  {
    species: 'lion',
    name: 'Leo',
    age: 5,
  },
  {
    species: 'hippo',
    name: 'Henry',
    age: 12,
  },
  {
    species: 'giraffe',
    name: 'Gerald',
    age: 3,
  }
];
