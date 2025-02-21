import { describe, expect, test } from "vitest"
import { getStepIndices } from "./utils"

describe("getStepIndices", () => {
  test("prevIndex === undefined", () => {
    expect(getStepIndices(undefined, 0)).toEqual([0])
    expect(getStepIndices(undefined, 1)).toEqual([1])
  })

  test("prevIndex === currentIndex", () => {
    expect(getStepIndices(0, 0)).toEqual([0])
    expect(getStepIndices(1, 1)).toEqual([1])
  })

  test("(currentIndex - prevIndex) === 1", () => {
    expect(getStepIndices(0, 1)).toEqual([1])
    expect(getStepIndices(1, 2)).toEqual([2])
  })

  test("(currentIndex - prevIndex) === -1", () => {
    expect(getStepIndices(2, 1)).toEqual([2])
    expect(getStepIndices(10, 9)).toEqual([10])
  })

  test("currentIndex > prevIndex", () => {
    expect(getStepIndices(0, 2)).toEqual([1, 2])
    expect(getStepIndices(3, 5)).toEqual([4, 5])
    expect(getStepIndices(1, 4)).toEqual([2, 3, 4])
    expect(getStepIndices(2, 6)).toEqual([3, 4, 5, 6])
    expect(getStepIndices(4, 10)).toEqual([5, 6, 7, 8, 9, 10])
  })

  test("currentIndex < prevIndex", () => {
    expect(getStepIndices(3, 1)).toEqual([3, 2])
    expect(getStepIndices(5, 3)).toEqual([5, 4])
    expect(getStepIndices(4, 1)).toEqual([4, 3, 2])
    expect(getStepIndices(6, 2)).toEqual([6, 5, 4, 3])
    expect(getStepIndices(10, 4)).toEqual([10, 9, 8, 7, 6, 5])
  })

  test("currentIndex < prevIndex && currentIndex === 0", () => {
    expect(getStepIndices(1, 0)).toEqual([1, 0])
    expect(getStepIndices(2, 0)).toEqual([2, 1, 0])
    expect(getStepIndices(3, 0)).toEqual([3, 2, 1, 0])
    expect(getStepIndices(5, 0)).toEqual([5, 4, 3, 2, 1, 0])
  })
})
