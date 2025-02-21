import { describe, expect, test } from "vitest"
import { selectionSort } from "./selection-sort"
import type { Step } from "./types"

describe("selection-sort", () => {
  test("should sort an empty array", () => {
    const array: number[] = []
    const actual = selectionSort(array)
    const expected: Step[] = [[[]]]
    expect(actual).toEqual(expected)
  })

  test("should sort an array with one element", () => {
    const array: number[] = [1]
    const actual = selectionSort(array)
    const expected: Step[] = [[[{ key: 0, value: 1, position: "middle" }]]]
    expect(actual).toEqual(expected)
  })

  test("should sort an array with two elements", () => {
    const array: number[] = [5, 3]
    const actual = selectionSort(array)
    const expected: Step[] = [
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 0, value: 5, position: "bottom" },
          { key: 1, value: 3, position: "middle" },
        ],
      ],
      [
        [
          { key: 0, value: 5, position: "middle" },
          { key: 1, value: 3, position: "bottom" },
        ],
      ],
      [
        [
          { key: 0, value: 5, position: "bottom" },
          { key: 1, value: 3, position: "bottom" },
        ],
        [
          { key: 1, value: 3, position: "bottom" },
          { key: 0, value: 5, position: "bottom" },
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
})
