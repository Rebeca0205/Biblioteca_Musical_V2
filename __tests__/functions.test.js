import { describe, it, expect } from 'vitest';
import {sumArray, countWords, findMax, isDivisible} from './functions';

describe('tests with the function sumArray', () => {
    it('should add numbers', () => {
        expect(sumArray([1, 2, 3])).toBe(6);
    });

    it('should add negative numbers', () => {
        expect(sumArray([-1, -2, -3])).toBe(-6);
    });

    it('should receive empty array and the sum must be 0', () => {
        expect(sumArray([])).toBe(0);
    });

    it('should receive an array with 0', () => {
        expect(sumArray([0])).toBe(0);
    });
});

describe('tests with the function countWords', () => {
    it('should count the amount of words', () => {
        expect(countWords("Hola mundo esto es una prueba")).toBe(6);
    });

    it('should count the amount of words with spaces in the beginning and end', () => {
        expect(countWords("  Hola mundo esto es una prueba  ")).toBe(6);
    });

    it('should receive an empty string and return 0', () => {
        expect(countWords("")).toBe(0);
    });

    it('should count the amount of words with many spaces between words', () => {
        expect(countWords("Hola     mundo       esto  es        una       prueba")).toBe(6);
    });
});

describe('tests with the function findMax', () => {
    it('should get the biggest number', () => {
        expect(findMax([5, 2, 9, 3])).toBe(9);
    });

    it('should get the biggest number with negatives', () => {
        expect(findMax([-5, -2, -9, -3])).toBe(-2);
    });

    it('should receive an empty array and return null', () => {
        expect(findMax([])).toBe(null);
    });

    it('should receive an array with the same number and return that number', () => {
        expect(findMax([5, 5, 5, 5])).toBe(5);
    });
});

describe('tests with the function isDivisible', () => {
    it('should verify if a number is divisible with other', () => {
        expect(isDivisible(10, 2)).toBe(true);
    });

    it('should verify if a number is NOT divisible with other', () => {
        expect(isDivisible(10, 3)).toBe(false);
    });

    it('should have 0 as a divisor and return an error', () => {
        expect(isDivisible(10, 0)).toBe('No se puede dividir entre cero');
    });

    it('should verify if a number is divisible with other with negatives', () => {
        expect(isDivisible(-10, -2)).toBe(true);
    });
});