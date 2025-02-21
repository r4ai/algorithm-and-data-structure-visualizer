import { rangeBetween } from "@/lib/utils"

export const getStepIndices = (
  prevIndex: number | undefined,
  currentIndex: number,
): number[] => {
  if (prevIndex === undefined || prevIndex === currentIndex) {
    return [currentIndex]
  }
  return prevIndex < currentIndex
    ? rangeBetween(prevIndex + 1, currentIndex)
    : rangeBetween(prevIndex, currentIndex + 1)
}
