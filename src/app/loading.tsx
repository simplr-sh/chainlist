import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center gap-4 flex-col">
      <Loader2Icon className="w-12 h-12 animate-spin" />
      <p className="text-lg font-semibold">Loading Chains...</p>
    </main>
  )
}
