import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />

      <div className="mx-auto max-w-3xl px-4 py-28 text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground ">
          Bienvenue sur OseParler
        </h1>
        <Button>Clique ici</Button>
      </div>
    </>
  )
}
