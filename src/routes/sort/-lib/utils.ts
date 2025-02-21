import { rangeBetween } from "@/lib/utils"

export const getStepIndices = (
  prevIndex: number | undefined,
  currentIndex: number,
): number[] => {
  if (prevIndex === undefined || prevIndex === currentIndex) {
    return [currentIndex]
  }
  if (prevIndex < currentIndex) {
    return rangeBetween(prevIndex + 1, currentIndex)
  }
  if (currentIndex === 0) {
    return rangeBetween(prevIndex, 0)
  }
  return rangeBetween(prevIndex, currentIndex + 1)
}
