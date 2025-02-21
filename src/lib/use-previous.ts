import { useState } from "react"

export const usePrevious = <T>(
  initialValue: T,
): [T | undefined, T, (value: T | ((prev: T) => T)) => void] => {
  const [[prevValue, value], setValue] = useState<[T | undefined, T]>([
    undefined,
    initialValue,
  ])

  const setBothValue = (value: T | ((prev: T) => T)) => {
    setValue(([_, prev]) => [
      prev,
      typeof value === "function" ? (value as (prev: T) => T)(prev) : value,
    ])
  }

  return [prevValue, value, setBothValue]
}
