import type { Item, Step } from "./types"

export const insertionSort = (data: number[]): Step[] => {
  const steps: Step[] = [
    [data.map((value, index) => ({ key: index, value, position: "middle" }))],
  ]
  if (data.length <= 1) return steps

  const result: Item[] = data.map((value, index) => ({
    key: index,
    value,
    position: "middle",
  }))
  for (let i = 1; i < result.length; i++) {
    const step: Step = [
      result.map((value) => ({
        ...value,
        position: value.key === i ? "bottom" : "middle",
      })),
    ]
    const current = { ...result[i] }

    {
      let j = i - 1
      while (j >= 0 && result[j].value > current.value) {
        result[j + 1] = result[j]
        j--
      }
      result[j + 1] = current
      step.push(
        result.map((value, index) => ({
          ...value,
          position: index === j + 1 ? "bottom" : "middle",
        })),
      )
    }

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
