import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/insertion-sort/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/insertion-sort/"!</div>;
}
