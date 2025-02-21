import { swap } from "@/lib/utils"
import type { Step } from "./types"

export const s = (data: number[]): number[] => {
  for (
    let unsortedStartIndex = 0;
    unsortedStartIndex < data.length;
    unsortedStartIndex++
  ) {
    let minIndex = unsortedStartIndex
    for (let i = unsortedStartIndex + 1; i < data.length; i++) {
      if (data[i] < data[minIndex]) {
        minIndex = i
      }
    }
    swap(data, unsortedStartIndex, minIndex)
  }
  return data
}

export const selectionSort = (data: number[]): Step[] => {
  const steps: Step[] = [
    [
      data.map((value, index) => ({
        key: index,
        value,
        position: "middle",
      })),
    ],
  ]
  if (data.length < 2) return steps

  const result = data.map((value, index) => ({
    key: index,
    value,
    position: "middle",
  }))

  for (
    let unsortedStartIndex = 0;
    unsortedStartIndex < result.length - 1;
    unsortedStartIndex++
  ) {
    let minIndex = unsortedStartIndex
    steps.push([
      result.map((value, index) => ({
        ...value,
        position: index === minIndex ? "bottom" : "middle",
      })),
    ])
    for (let i = unsortedStartIndex + 1; i < result.length; i++) {
      if (result[i].value < result[minIndex].value) {
        minIndex = i
      }
      steps.push([
        result.map((value, index) => ({
          ...value,
          position:
            index === minIndex || index === unsortedStartIndex
              ? "bottom"
              : index === i
                ? "top"
                : "middle",
        })),
      ])
    }
    const step: Step = []
    step.push(
      result.map((value, index) => ({
        ...value,
        position:
          index === unsortedStartIndex || index === minIndex
            ? "bottom"
            : "middle",
      })),
    )
    swap(result, unsortedStartIndex, minIndex)
    step.push(
      result.map((value, index) => ({
        ...value,
        position:
          index === unsortedStartIndex || index === minIndex
            ? "bottom"
            : "middle",
      })),
    )
    steps.push(step)
  }

  steps.push([
    result.map((value) => ({
      ...value,
      position: "middle",
    })),
  ])

  return steps
}
