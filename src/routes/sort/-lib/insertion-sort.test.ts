import { describe, expect, test } from "vitest"
import { insertionSort } from "./insertion-sort"
import type { Step } from "./types"

describe("insertion-sort", () => {
  test("should sort an empty array", () => {
    const array: number[] = []
    const actual = insertionSort(array)
    const expected: Step[] = [[[]]]
    expect(actual).toEqual(expected)
  })

  test("should sort an array with one element", () => {
    const array: number[] = [5]
    const actual = insertionSort(array)
    const expected: Step[] = [[[{ key: 0, value: 5, position: "middle" }]]]
    expect(actual).toEqual(expected)
  })

  test("should sort an array with two elements", () => {
    const array: number[] = [5, 3]
    const actual = insertionSort(array)
    const expected: Step[] = [
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 3, position: "bottom" },
        ],
        [
          { key: 1, value: 3, position: "bottom" },
          { key: 0, value: 5, position: "middle" },
        ],
      ],
      [
        [
          { key: 1, value: 3, position: "middle" },
          { key: 0, value: 5, position: "middle" },
        ],
      ],
    ]
    expect(actual).toEqual(expected)
  })

  test("should sort an array with many elements", () => {
    const array = [5, 2, 4, 6, 1, 3]
    const actual = insertionSort(array)
    const expected: Step[] = [
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 2, position: "bottom" },
          { key: 2, value: 4, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
        [
          { key: 1, value: 2, position: "bottom" },
          { key: 0, value: 5, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 1, value: 2, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 2, value: 4, position: "bottom" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
        [
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "bottom" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "bottom" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
        [
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "bottom" },
          { key: 4, value: 1, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 4, value: 1, position: "bottom" },
          { key: 5, value: 3, position: "middle" },
        ],
        [
          { key: 4, value: 1, position: "bottom" },
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 5, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 4, value: 1, position: "middle" },
          { key: 1, value: 2, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
          { key: 5, value: 3, position: "bottom" },
        ],
        [
          { key: 4, value: 1, position: "middle" },
          { key: 1, value: 2, position: "middle" },
          { key: 5, value: 3, position: "bottom" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
        ],
      ],
      [
        [
          { key: 4, value: 1, position: "middle" },
          { key: 1, value: 2, position: "middle" },
          { key: 5, value: 3, position: "middle" },
          { key: 2, value: 4, position: "middle" },
          { key: 0, value: 5, position: "middle" },
          { key: 3, value: 6, position: "middle" },
        ],
      ],
    ]
    expect(actual).toEqual(expected)
  })
})
