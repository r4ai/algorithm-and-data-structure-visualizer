import type { Step } from "./types"

const swap = <T>(data: T[], i: number, j: number): void => {
  const temp = { ...data[i] }
  data[i] = data[j]
  data[j] = temp
}

const b = (data: number[]): number[] => {
  let sorting = true
  for (let sortedEndIndex = 0; sorting; sortedEndIndex++) {
    sorting = false
    for (let i = data.length - 1; i >= sortedEndIndex + 1; i--) {
      if (data[i] < data[i - 1]) {
        swap(data, i, i - 1)
        sorting = true
      }
    }
  }
  return data
}

export const bubbleSort = (data: number[]): Step[] => {
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

  let sorting = true
  for (let sortedEndIndex = 0; sorting; sortedEndIndex++) {
    sorting = false
    for (let i = result.length - 1; i >= sortedEndIndex + 1; i--) {
      const step: Step = []
      step.push(
        result.map((value, index) => ({
          ...value,
          position: index === i || index === i - 1 ? "bottom" : "middle",
        })),
      )
      if (result[i].value < result[i - 1].value) {
        swap(result, i, i - 1)
        sorting = true
        step.push(
          result.map((value, index) => ({
            ...value,
            position: index === i || index === i - 1 ? "bottom" : "middle",
          })),
        )
      }
      steps.push(step)
    }
  }

  steps.push([
    result.map((value) => ({
      ...value,
      position: "middle",
    })),
  ])

  return steps
}
