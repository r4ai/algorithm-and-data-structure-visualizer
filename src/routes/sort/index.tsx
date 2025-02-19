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
import { createFileRoute } from "@tanstack/react-router"
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const ALGORITHMS = [
  { name: "Bubble Sort", value: "bubble" },
  { name: "Selection Sort", value: "selection" },
  { name: "Insertion Sort", value: "insertion" },
] as const

const SPEEDS = [
  { name: "Slow", value: "slow" },
  { name: "Medium", value: "medium" },
  { name: "Fast", value: "fast" },
] as const

// Create a context for the sort simulation
type SortSimulationContextType = {
  algorithm: (typeof ALGORITHMS)[number]["value"]
  setAlgorithm: (value: (typeof ALGORITHMS)[number]["value"]) => void
  data: number[]
  setData: (value: number[]) => void
  sorting: boolean
  startSorting: () => void
  pauseSorting: () => void
  nextStep: () => void
  currentStep: number
  totalSteps: number
  speed: (typeof SPEEDS)[number]["value"]
  setSpeed: (value: (typeof SPEEDS)[number]["value"]) => void
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
    useState<SortSimulationContextType["algorithm"]>("bubble")
  const [data, setData] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [speed, setSpeed] =
    useState<SortSimulationContextType["speed"]>("medium")
  const [inputData, setInputData] = useState("")

  useEffect(() => {
    generateRandomData()
  }, [])

  const generateRandomData = () => {
    const newData = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 1,
    )
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
    // Implement sorting logic here
  }

  const pauseSorting = () => {
    setSorting(false)
  }

  const nextStep = () => {
    // Implement next step logic here
  }

  const resetSimulation = (newData: number[] = data) => {
    setSorting(false)
    setCurrentStep(0)
    setTotalSteps((newData.length * (newData.length - 1)) / 2) // Approximation
  }

  const handleStepChange = (value: number[]) => {
    setCurrentStep(value[0])
    // Implement logic to update data state based on the selected step
  }

  return (
    <SortSimulationContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        data,
        setData,
        sorting,
        startSorting,
        pauseSorting,
        nextStep,
        currentStep,
        totalSteps,
        speed,
        setSpeed,
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

const useSortSimulationContext = () => {
  const context = useContext(SortSimulationContext)
  if (!context)
    throw new Error(
      "useSortSimulationContext must be used within a SortSimulationProvider",
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
  } = useSortSimulationContext()

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

const DisplaySection = () => {
  const { data } = useSortSimulationContext()
  return (
    <div className="mb-4">
      <div className="flex h-64 items-end space-x-1 rounded-lg bg-gray-100 p-2">
        {data.map((value, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a simulation, the index is used as a key
            key={index}
            className="w-4 rounded-t bg-blue-500"
            style={{ height: `${(value / Math.max(...data)) * 100}%` }}
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
    currentStep,
    totalSteps,
    handleStepChange,
  } = useSortSimulationContext()

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
          Step: {currentStep} / {totalSteps}
        </Label>
        <Slider
          id="step-slider"
          value={[currentStep]}
          onValueChange={handleStepChange}
          max={totalSteps}
          step={1}
        />
      </div>
    </>
  )
}

const InfoSection = () => {
  const { algorithm, speed } = useSortSimulationContext()

  return (
    <div>
      <p>
        Algorithm: {ALGORITHMS.find((algo) => algo.value === algorithm)?.name}
      </p>
      <p>Speed: {SPEEDS.find((s) => s.value === speed)?.name}</p>
    </div>
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
        <InfoSection />
      </div>
    </SortSimulationProvider>
  )
}

export const Route = createFileRoute("/sort/")({
  component: SortSimulator,
})
