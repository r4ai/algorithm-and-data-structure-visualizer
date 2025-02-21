import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { usePrevious } from "@/lib/use-previous"
import { createFileRoute } from "@tanstack/react-router"
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react"
import { motion } from "motion/react"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useInterval } from "usehooks-ts"
import { bubbleSort } from "./-lib/bubble-sort"
import { insertionSort } from "./-lib/insertion-sort"
import type { Item, Step } from "./-lib/types"
import { getStepIndices } from "./-lib/utils"

const ALGORITHMS = [
  { name: "Bubble Sort", value: "bubble" },
  { name: "Selection Sort", value: "selection" },
  { name: "Insertion Sort", value: "insertion" },
] as const

const SPEEDS = [
  { name: "Slow", value: "slow" },
  { name: "Medium", value: "medium" },
  { name: "Fast", value: "fast" },
  { name: "Super Fast", value: "super-fast" },
] as const

// Create a context for the sort simulation
type SortSimulationContextType = {
  algorithm: (typeof ALGORITHMS)[number]["value"]
  setAlgorithm: (value: (typeof ALGORITHMS)[number]["value"]) => void
  data: number[]
  steps: Step[]
  setData: (value: number[]) => void
  sorting: boolean
  startSorting: () => void
  pauseSorting: () => void
  nextStep: () => void
  currentStepIndex: number
  prevStepIndex: number | undefined
  totalSteps: number
  speed: (typeof SPEEDS)[number]["value"]
  setSpeed: (value: (typeof SPEEDS)[number]["value"]) => void
  duration: number
  inputData: string
  handleInputDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  applyInputData: () => void
  generateRandomData: () => void
  resetSimulation: (newData?: number[]) => void
  handleStepChange: (value: number[]) => void
}
const SortSimulationContext = createContext<
  SortSimulationContextType | undefined
>(undefined)

const SortSimulationProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] =
    useState<SortSimulationContextType["algorithm"]>("insertion")
  const [data, setData] = useState<number[]>([])
  const steps = useMemo(() => {
    switch (algorithm) {
      case "insertion":
        return insertionSort(data)
      case "bubble":
        return bubbleSort(data)
      default:
        throw new Error("Invalid algorithm")
    }
  }, [data, algorithm])
  const totalSteps = useMemo(() => steps.length, [steps])
  const [sorting, setSorting] = useState(false)
  const [prevStepIndex, currentStepIndex, setCurrentStepIndex] = usePrevious(0)
  const [speed, setSpeed] =
    useState<SortSimulationContextType["speed"]>("medium")
  const duration = useMemo(() => {
    switch (speed) {
      case "super-fast":
        return 0.2
      case "fast":
        return 0.5
      case "medium":
        return 1
      case "slow":
        return 2
    }
  }, [speed])
  const [inputData, setInputData] = useState("")

  useInterval(
    () => {
      if (sorting && currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex((prevStep) => prevStep + 1)
      } else {
        setSorting(false)
      }
    },
    sorting ? duration * 1000 : null,
  )

  useEffect(() => {
    generateRandomData()
  }, [])

  const generateRandomData = () => {
    const newData = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 1,
    )
    setInputData(newData.join(", "))
    setData(newData)
    resetSimulation(newData)
  }

  const handleInputDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }

  const applyInputData = () => {
    const newData = inputData
      .split(",")
      .map((num) => Number.parseInt(num.trim()))
      .filter((num) => !Number.isNaN(num))
    if (newData.length > 0) {
      setData(newData)
      resetSimulation(newData)
    }
  }

  const startSorting = () => {
    setSorting(true)
  }

  const pauseSorting = () => {
    setSorting(false)
  }

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prevStep) => prevStep + 1)
    }
  }

  const resetSimulation = (newData: number[] = data) => {
    setSorting(false)
    setCurrentStepIndex(0)
  }

  const handleStepChange = (value: number[]) => {
    setCurrentStepIndex(value[0])
  }

  return (
    <SortSimulationContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        data,
        setData,
        steps,
        sorting,
        startSorting,
        pauseSorting,
        nextStep,
        currentStepIndex,
        prevStepIndex,
        totalSteps,
        speed,
        setSpeed,
        duration,
        inputData,
        handleInputDataChange,
        applyInputData,
        generateRandomData,
        resetSimulation,
        handleStepChange,
      }}
    >
      {children}
    </SortSimulationContext.Provider>
  )
}

const useSortSimulation = () => {
  const context = useContext(SortSimulationContext)
  if (!context)
    throw new Error(
      "useSortSimulation must be used within a SortSimulationProvider",
    )
  return context
}

const FormSection = () => {
  const {
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    inputData,
    handleInputDataChange,
    applyInputData,
    generateRandomData,
  } = useSortSimulation()

  return (
    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="algorithm-select">Algorithm</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger id="algorithm-select">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            {ALGORITHMS.map((algo) => (
              <SelectItem key={algo.value} value={algo.value}>
                {algo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="speed-select">Simulation Speed</Label>
        <Select value={speed} onValueChange={setSpeed}>
          <SelectTrigger id="speed-select">
            <SelectValue placeholder="Select speed" />
          </SelectTrigger>
          <SelectContent>
            {SPEEDS.map((speedOption) => (
              <SelectItem key={speedOption.value} value={speedOption.value}>
                {speedOption.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Label htmlFor="data-input">Input Data (comma-separated numbers)</Label>
        <div className="flex space-x-2">
          <Input
            id="data-input"
            value={inputData}
            onChange={handleInputDataChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyInputData()
              }
            }}
            placeholder="e.g. 64, 34, 25, 12, 22, 11, 90"
          />
          <Button onClick={applyInputData}>Apply</Button>
          <Button onClick={generateRandomData} variant="outline">
            Random
          </Button>
        </div>
      </div>
    </div>
  )
}

type StepAnimation = {
  key: number
  value: number
  indices: number[]
  positions: Item["position"][]
}

const DisplaySection = () => {
  const { steps, prevStepIndex, currentStepIndex, duration } =
    useSortSimulation()

  const animation = useMemo(() => {
    const isReversed =
      prevStepIndex !== undefined && prevStepIndex > currentStepIndex
    const stepIndices = getStepIndices(prevStepIndex, currentStepIndex)
    console.log("stepIndices", isReversed, stepIndices)

    const animation: StepAnimation[] = []
    for (const stepIndex of stepIndices) {
      const step = steps.at(stepIndex)
      if (!step) continue
      for (const items of isReversed ? step.toReversed() : step) {
        for (const [itemIndex, item] of items.entries()) {
          animation[item.key] ??= {
            key: item.key,
            value: item.value,
            indices: [],
            positions: [],
          }
          animation[item.key].indices.push(itemIndex)
          animation[item.key].positions.push(item.position)
        }
      }
    }

    return animation
  }, [steps, currentStepIndex, prevStepIndex])

  return (
    <div className="mb-4">
      <div className="relative flex h-64">
        {animation?.map(({ value, key, positions, indices }) => (
          <motion.div
            key={key}
            animate={{
              x: indices.map((index) => index * 20),
              backgroundColor: positions.map((position) =>
                position === "middle"
                  ? "#3182ce"
                  : position === "bottom"
                    ? "#f56565"
                    : "#48bb78",
              ),
            }}
            transition={{ duration }}
            className={"absolute bottom-0 w-4 rounded-t"}
            style={{
              height: `${(value / Math.max(...animation.map(({ value }) => value))) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const ControlSection = () => {
  const {
    sorting,
    startSorting,
    pauseSorting,
    nextStep,
    resetSimulation,
    currentStepIndex: currentStep,
    totalSteps,
    handleStepChange,
  } = useSortSimulation()

  return (
    <>
      <div className="mb-4 flex items-center space-x-4">
        <Button onClick={sorting ? pauseSorting : startSorting}>
          {sorting ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {sorting ? "Pause" : "Start"}
        </Button>
        <Button onClick={nextStep} disabled={sorting}>
          <SkipForward className="mr-2 h-4 w-4" />
          Next Step
        </Button>
        <Button onClick={() => resetSimulation()} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <div className="mb-4">
        <Label htmlFor="step-slider">
          Step: {currentStep} / {totalSteps - 1}
        </Label>
        <Slider
          id="step-slider"
          value={[currentStep]}
          onValueChange={handleStepChange}
          max={totalSteps - 1}
          step={1}
        />
      </div>
    </>
  )
}

const SortSimulator = () => {
  return (
    <SortSimulationProvider>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 font-bold text-2xl">Sort Algorithm Simulator</h1>
        <FormSection />
        <DisplaySection />
        <ControlSection />
      </div>
    </SortSimulationProvider>
  )
}

export const Route = createFileRoute("/sort/")({
  component: SortSimulator,
})
