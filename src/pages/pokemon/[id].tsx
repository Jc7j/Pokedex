import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { PokemonForm } from '~/components/PokemonForm'
import {
  Button,
  Dialog,
  Label,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '~/components/ui'
import { deletePokemon, getOne } from '~/lib/pokemon-queries'

export default function PokemonPage() {
  const router = useRouter()
  const { id } = router.query
  const pokemonId = typeof id === 'string' ? Number.parseInt(id, 10) : null

  const [isEditing, setIsEditing] = useQueryState('edit', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : ''),
  })

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: pokemon, error, isLoading } = getOne(pokemonId)
  const deleteMutation = deletePokemon()

  function handleDelete() {
    if (!pokemonId) return

    deleteMutation.mutate(pokemonId, {
      onSuccess: () => {
        setShowDeleteDialog(false)
        router.push('/pokemon')
      },
      onError: (error) => {
        console.error('Delete error:', error)
        // Keep dialog open to show error, but user can close it
      },
    })
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-400 text-xl">
          Error loading Pokemon: {error.message}
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <PokemonForm
        pokemon={pokemon}
        mode="edit"
        onBack={() => setIsEditing(false)}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl rounded-lg bg-black/70 p-8">
        <div className="flex items-center justify-between">
          <Link
            href="/pokemon"
            className="flex items-center gap-2 rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <ArrowLeft className="h-8 w-8" />
          </Link>

          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 py-2 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Skeleton className="h-[447px] w-[476px]" />
          </div>

          <div className="space-y-4 rounded-lg bg-gray-800/60 p-4">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-16" />
            </div>

            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-16 w-full" />

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pokemon) {
    return null
  }

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-black/70 p-8">
      <div className=" flex items-center justify-between">
        <Link
          href="/pokemon"
          className="flex items-center gap-2 rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Back to pokemon"
        >
          <ArrowLeft className="h-8 w-8" />
        </Link>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 py-2 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src={pokemon.photoUrl || '/Pikachu.png'}
            alt={pokemon.name}
            width={476}
            height={447}
            className="object-contain"
          />
        </div>

        <div className="space-y-4 rounded-lg bg-gray-800/60 p-4 text-white">
          <div className="flex justify-between">
            <h1 className="font-semibold text-4xl text-white">
              {pokemon.name}
            </h1>
            <p className="text-lg">N° {pokemon.pokedexNumber}</p>
          </div>

          <span className="flex gap-2 text-primary">
            {pokemon.types.map((pokemonType, index) => (
              <p key={index}>{pokemonType.type.name}</p>
            ))}
          </span>

          <p className="text-white leading-relaxed">{pokemon.description}</p>

          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <Label>Height</Label>
              <p>
                {pokemon.heightCm
                  ? `${Math.floor(pokemon.heightCm / 30.48)}' ${Math.round(
                      (pokemon.heightCm % 30.48) / 2.54
                    )
                      .toString()
                      .padStart(2, '0')}"`
                  : 'Unknown'}
              </p>
            </div>
            <div>
              <Label>Weight</Label>
              <p>
                {pokemon.weightKg
                  ? `${(pokemon.weightKg * 2.205).toFixed(1)} lbs`
                  : 'Unknown'}
              </p>
            </div>
            <div>
              <Label>Gender Ratio</Label>
              <p>
                {pokemon.genderMaleRatio
                  ? `${(pokemon.genderMaleRatio * 100).toFixed(1)}%`
                  : '0%'}{' '}
                /{' '}
                {pokemon.genderFemaleRatio
                  ? `${(pokemon.genderFemaleRatio * 100).toFixed(1)}%`
                  : '0%'}
              </p>
            </div>
            <div>
              <Label>Abilities</Label>
              <p>
                {pokemon.abilities?.map((a) => a.ability.name).join(', ') ||
                  'Unknown'}
              </p>
            </div>
            <div>
              <Label>Egg Groups</Label>
              <p>
                {pokemon.eggGroups?.map((g) => g.eggGroup.name).join(', ') ||
                  'Unknown'}
              </p>
            </div>
          </div>

          {(pokemon.evolutionsFrom.length > 0 ||
            pokemon.evolutionsTo.length > 0) && (
            <div className="space-y-4">
              <Label>Evolutions</Label>

              {pokemon.evolutionsFrom.length > 0 && (
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">
                    {pokemon.evolutionsFrom[0]?.method}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/pokemon/${pokemon.evolutionsFrom[0]?.fromPokemon.id}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={
                          pokemon.evolutionsFrom[0]?.fromPokemon.photoUrl ||
                          '/Pikachu.png'
                        }
                        alt={
                          pokemon.evolutionsFrom[0]?.fromPokemon.name ||
                          'Previous evolution'
                        }
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                    <p className="text-2xl text-white">→</p>
                    <Image
                      src={pokemon.photoUrl || '/Pikachu.png'}
                      alt={pokemon.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {pokemon.evolutionsTo.length > 0 && (
                <div className="space-y-2">
                  <p className="text-gray-300 text-sm">
                    {pokemon.evolutionsTo[0]?.method}
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={pokemon.photoUrl || '/Pikachu.png'}
                      alt={pokemon.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                    <p className="text-2xl text-white">→</p>
                    <Link
                      href={`/pokemon/${pokemon.evolutionsTo[0]?.toPokemon.id}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={
                          pokemon.evolutionsTo[0]?.toPokemon.photoUrl ||
                          '/Pikachu.png'
                        }
                        alt={
                          pokemon.evolutionsTo[0]?.toPokemon.name ||
                          'Evolution Pokemon'
                        }
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Pokemon</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {pokemon?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteMutation.error && (
            <div className="rounded-lg border border-red-500 bg-red-900/50 p-3">
              <p className="text-red-200 text-sm">
                Error:{' '}
                {deleteMutation.error?.message || 'Failed to delete Pokemon'}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
