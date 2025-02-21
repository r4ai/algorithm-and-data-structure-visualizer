import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Generates an array of numbers in the range between start and end.
 *
 * @param start - The starting number of the range.
 * @param end - The ending number of the range.
 * @returns An array of numbers from start to end, inclusive.
 *
 * @example
 * rangeBetween(0, 0) // [0]
 * rangeBetween(0, 5) // [0, 1, 2, 3, 4, 5]
 * rangeBetween(5, 0) // [5, 4, 3, 2, 1, 0]
 */
export const rangeBetween = (start: number, end: number) => {
  if (start > end) {
    return Array.from({ length: start - end + 1 }, (_, i) => start - i)
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

/**
 * Swaps two elements in an array.
 *
 * @param data - The array containing elements to be swapped.
 * @param i - The index of the first element.
 * @param j - The index of the second element.
 *
 * @example
 * const data = [1, 2, 3, 4, 5]
 * swap(data, 0, 4)
 * console.log(data) // [5, 2, 3, 4, 1]
 */
export const swap = <T>(data: T[], i: number, j: number): void => {
  if (i < 0 || i >= data.length || j < 0 || j >= data.length) {
    throw new Error("Index out of bounds")
  }

  const temp = clone(data[i])
  data[i] = clone(data[j])
  data[j] = temp
}
