import type { Pokemon } from '@prisma/client'
import { useForm } from '@tanstack/react-form'
import { Button, Input, Label, Textarea } from '~/components/ui'
import { useCreatePokemon, useUpdatePokemon } from '~/lib/queries'
import { tryCatch } from '~/lib/try-catch'

interface PokemonFormProps {
  onBack: () => void
  pokemon?: Pokemon | null
  mode?: 'create' | 'edit'
}

type PokemonFormData = {
  name: string
  pokedexNumber: string
  photoUrl: string | null
  description: string
  heightCm: string
  weightKg: string
  genderFemaleRatio: string
  genderMaleRatio: string
  types: string[]
  abilities: string[]
  eggGroups: string[]
  evolutionDescription: string
  evolutionPhotoUrl: string | null
}

export function PokemonForm({
  onBack,
  pokemon,
  mode = 'create',
}: PokemonFormProps) {
  const isEditMode = mode === 'edit' && !!pokemon

  const createMutation = useCreatePokemon()
  const updateMutation = useUpdatePokemon()

  const form = useForm({
    defaultValues: {
      name: pokemon?.name ?? '',
      pokedexNumber: pokemon?.pokedexNumber.toString() ?? '',
      photoUrl: pokemon?.photoUrl ?? null,
      description: pokemon?.description ?? '',
      heightCm: pokemon?.heightCm?.toString() ?? '',
      weightKg: pokemon?.weightKg?.toString() ?? '',
      genderFemaleRatio: pokemon?.genderFemaleRatio?.toString() ?? '',
      genderMaleRatio: pokemon?.genderMaleRatio?.toString() ?? '',
      types: [],
      abilities: [],
      eggGroups: [],
      evolutionDescription: '',
      evolutionPhotoUrl: null,
    } as PokemonFormData,
    onSubmit: async ({ value }) => {
      const submitData = {
        name: value.name,
        pokedexNumber: value.pokedexNumber,
        photoUrl: value.photoUrl,
        description: value.description,
        heightCm: value.heightCm,
        weightKg: value.weightKg,
        genderFemaleRatio: value.genderFemaleRatio,
        genderMaleRatio: value.genderMaleRatio,
        types: value.types,
        abilities: value.abilities,
        eggGroups: value.eggGroups,
      }

      if (isEditMode && pokemon) {
        const { error } = await tryCatch(
          updateMutation.mutateAsync({
            id: pokemon.id,
            ...submitData,
          })
        )
        if (!error) {
          onBack()
        } else {
          console.error('Form submission error:', error)
        }
      } else {
        const { error } = await tryCatch(createMutation.mutateAsync(submitData))
        if (!error) {
          onBack()
        } else {
          console.error('Form submission error:', error)
        }
      }
    },
  })

  const isLoading = createMutation.isPending || updateMutation.isPending
  const error = createMutation.error || updateMutation.error

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-black/70 p-8">
      <h1 className="mb-6 font-bold text-2xl text-white">
        {isEditMode ? `${pokemon.name}` : 'Nuevo Pokemon'}
      </h1>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-900/50 p-3">
          <p className="text-red-200 text-sm">Error: {error.message}</p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <div className="space-y-4">
          {/* Name and Number Row */}
          <div className="grid grid-cols-2 gap-3">
            <form.Field name="name">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Name"
                  autoFocus
                  disabled={isLoading}
                />
              )}
            </form.Field>

            <form.Field name="pokedexNumber">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Nº 123"
                  disabled={isLoading}
                />
              )}
            </form.Field>
          </div>

          {/* Pokemon Photo */}
          <form.Field name="photoUrl">
            {(field) => (
              <div>
                <div className="rounded-lg bg-gray-800 p-3">
                  <Label
                    htmlFor="pokemon-photo"
                    className="mb-2 block text-gray-500 text-sm"
                  >
                    Pokemon Photo
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mb-2 border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    disabled={isLoading}
                  >
                    Select field
                  </Button>
                  <p className="text-gray-500 text-xs">No fields</p>
                </div>
              </div>
            )}
          </form.Field>

          {/* Type */}
          <form.Field name="types">
            {(field) => (
              <Input
                value={
                  Array.isArray(field.state.value)
                    ? field.state.value.join(', ')
                    : ''
                }
                onChange={(e) => {
                  const types = e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter((t) => t !== '')
                  field.handleChange(types)
                }}
                className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Type (e.g., grass, electric)"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <Textarea
                value={field.state.value || ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="min-h-[60px] resize-none border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Description"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Height and Weight Row */}
          <div className="grid grid-cols-2 gap-3">
            <form.Field name="heightCm">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Height (cm)"
                  disabled={isLoading}
                />
              )}
            </form.Field>

            <form.Field name="weightKg">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Weight (kg)"
                  disabled={isLoading}
                />
              )}
            </form.Field>
          </div>

          {/* Gender Ratios Row */}
          <div className="grid grid-cols-2 gap-3">
            <form.Field name="genderMaleRatio">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="♂ Gender ratio"
                  disabled={isLoading}
                />
              )}
            </form.Field>

            <form.Field name="genderFemaleRatio">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="♀ Gender ratio"
                  disabled={isLoading}
                />
              )}
            </form.Field>
          </div>

          {/* Abilities */}
          <form.Field name="abilities">
            {(field) => (
              <Input
                value={
                  Array.isArray(field.state.value)
                    ? field.state.value.join(', ')
                    : ''
                }
                onChange={(e) => {
                  const abilities = e.target.value
                    .split(',')
                    .map((a) => a.trim())
                    .filter((a) => a !== '')
                  field.handleChange(abilities)
                }}
                className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Abilities"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Egg Groups */}
          <form.Field name="eggGroups">
            {(field) => (
              <Input
                value={
                  Array.isArray(field.state.value)
                    ? field.state.value.join(', ')
                    : ''
                }
                onChange={(e) => {
                  const eggGroups = e.target.value
                    .split(',')
                    .map((g) => g.trim())
                    .filter((g) => g !== '')
                  field.handleChange(eggGroups)
                }}
                className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Egg Groups"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Evolution Description */}
          <form.Field name="evolutionDescription">
            {(field) => (
              <Textarea
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="min-h-[60px] resize-none border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                placeholder="Evolution description"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Evolution Photo */}
          <form.Field name="evolutionPhotoUrl">
            {(field) => (
              <div>
                <div className="rounded-lg bg-gray-800 p-3">
                  <Label
                    htmlFor="evolution-photo"
                    className="mb-2 block text-gray-500 text-sm"
                  >
                    Evolution Photo
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mb-2 border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    disabled={isLoading}
                  >
                    Select field
                  </Button>
                  <p className="text-gray-500 text-xs">No fields</p>
                </div>
              </div>
            )}
          </form.Field>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-gray-600 bg-white text-black hover:bg-gray-800"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
