import { createFileRoute } from "@tanstack/react-router"
import { LinkIcon } from "lucide-react"

export const Route = createFileRoute("/")({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="mx-auto max-w-lg p-5">
      <h1 className="font-bold text-2xl">
        Algorithm and Data Structure Visualizer
      </h1>
      <ul className="mt-4">
        <li>
          <a className="underline" href="/sort">
            <LinkIcon className="mr-1 inline-block size-4" />
            Sort Algorithms
          </a>
        </li>
      </ul>
    </div>
  )
}
