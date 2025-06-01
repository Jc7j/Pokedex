import { useForm } from '@tanstack/react-form'
import { Button, Input, Label, Textarea } from '~/components/ui'

interface CreatePokemonProps {
  onBack: () => void
}

type CreatePokemonFormData = {
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

export function CreatePokemon({ onBack }: CreatePokemonProps) {
  const form = useForm({
    defaultValues: {
      name: '',
      pokedexNumber: '',
      photoUrl: null,
      description: '',
      heightCm: '',
      weightKg: '',
      genderFemaleRatio: '',
      genderMaleRatio: '',
      types: [],
      abilities: [],
      eggGroups: [],
      evolutionDescription: '',
      evolutionPhotoUrl: null,
    } as CreatePokemonFormData,
    onSubmit: async ({ value }) => {
      // Nothing happens on submit yet
      console.log('Form submitted:', value)
    },
  })

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-black/70 p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-white">Nuevo Pokemon</h1>
      </div>

      {/* Form */}
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
                placeholder="Type"
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
                  placeholder="Height"
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
                  placeholder="Weight"
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
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
