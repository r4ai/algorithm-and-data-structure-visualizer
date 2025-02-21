import { describe, expect, test } from "vitest"
import { rangeBetween } from "./utils"

describe("rangeBetween", () => {
  test("start === end", () => {
    expect(rangeBetween(0, 0)).toEqual([0])
    expect(rangeBetween(1, 1)).toEqual([1])
    expect(rangeBetween(-3, -3)).toEqual([-3])
  })

  test("start < end", () => {
    expect(rangeBetween(1, 3)).toEqual([1, 2, 3])
    expect(rangeBetween(-2, 1)).toEqual([-2, -1, 0, 1])
  })

  test("start > end", () => {
    expect(rangeBetween(3, 1)).toEqual([3, 2, 1])
    expect(rangeBetween(0, -2)).toEqual([0, -1, -2])
  })
})
