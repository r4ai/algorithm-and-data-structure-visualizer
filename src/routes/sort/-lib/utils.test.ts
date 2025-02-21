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
    expect(getStepIndices(1, 0)).toEqual([1])
    expect(getStepIndices(2, 1)).toEqual([2])
  })
})
