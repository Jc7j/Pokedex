import { useForm } from '@tanstack/react-form'
import Image from 'next/image'
import { useState } from 'react'
import { Button, Input, Label, Textarea } from '~/components/ui'
import {
  type PokemonFormProps,
  type PokemonWithRelations,
  create,
  update,
} from '~/lib/pokemon-queries'
import { tryCatch } from '~/lib/try-catch'

// TODO (IGNORE): Came across where create/update an evolution requires a relation to an existing pokemon
// This couldve been resolved by having better initial planning. Stopped here for now due to time constraints.

export function PokemonForm({
  onBack,
  pokemon,
  mode = 'create',
}: PokemonFormProps) {
  const isEditMode = mode === 'edit' && !!pokemon
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingEvolution, setUploadingEvolution] = useState(false)

  const {
    mutateAsync: createMutation,
    isPending: isCreating,
    error: createError,
  } = create()
  const {
    mutateAsync: updateMutation,
    isPending: isUpdating,
    error: updateError,
  } = update()

  async function uploadFile(file: File): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const base64File = e.target?.result as string
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              file: base64File,
              fileName: file.name,
            }),
          })

          const result = await response.json()
          if (result.success) {
            resolve(result.url)
          } else {
            reject(new Error(result.error))
          }
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsDataURL(file)
    })
  }

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
      types:
        pokemon?.types?.map((t: { type: { name: string } }) => t.type.name) ??
        [],
      abilities:
        pokemon?.abilities?.map(
          (a: { ability: { name: string } }) => a.ability.name
        ) ?? [],
      eggGroups:
        pokemon?.eggGroups?.map(
          (g: { eggGroup: { name: string } }) => g.eggGroup.name
        ) ?? [],
      evolutionDescription: pokemon?.evolutionsTo?.[0]?.method ?? '',
      evolutionPhotoUrl:
        pokemon?.evolutionsTo?.[0]?.toPokemon?.photoUrl ?? null,
    },
    onSubmit: async ({ value }) => {
      const submitData = {
        name: value.name,
        pokedexNumber: Number(value.pokedexNumber),
        photoUrl: value.photoUrl,
        description: value.description,
        heightCm: value.heightCm ? Number(value.heightCm) : null,
        weightKg: value.weightKg ? Number(value.weightKg) : null,
        genderFemaleRatio: value.genderFemaleRatio
          ? Number(value.genderFemaleRatio)
          : null,
        genderMaleRatio: value.genderMaleRatio
          ? Number(value.genderMaleRatio)
          : null,
        types: value.types,
        abilities: value.abilities,
        eggGroups: value.eggGroups,
        evolutionMethod: value.evolutionDescription || null,
        evolutionPhotoUrl: value.evolutionPhotoUrl,
      }

      if (isEditMode && pokemon) {
        const { error } = await tryCatch(
          updateMutation({
            id: pokemon.id,
            ...submitData,
          } as unknown as Partial<PokemonWithRelations> & { id: number })
        )
        if (!error) {
          onBack()
        } else {
          console.error('Form submission error:', error)
        }
      } else {
        const { error } = await tryCatch(
          createMutation(submitData as unknown as Partial<PokemonWithRelations>)
        )
        if (!error) {
          onBack()
        } else {
          console.error('Form submission error:', error)
        }
      }
    },
  })

  const isLoading = isCreating || isUpdating
  const error = createError || updateError

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

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="pokemon-photo-input"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setUploadingPhoto(true)
                        try {
                          const url = await uploadFile(file)
                          if (url) {
                            field.handleChange(url)
                          }
                        } catch (error) {
                          console.error('Upload failed:', error)
                        } finally {
                          setUploadingPhoto(false)
                        }
                      }
                    }}
                    disabled={isLoading || uploadingPhoto}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mb-3 border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    disabled={isLoading || uploadingPhoto}
                    onClick={() =>
                      document.getElementById('pokemon-photo-input')?.click()
                    }
                  >
                    {uploadingPhoto ? 'Uploading...' : 'Select field'}
                  </Button>

                  {field.state.value && (
                    <>
                      <div className="mb-3 flex justify-center">
                        <Image
                          src={field.state.value}
                          alt="Pokemon preview"
                          width={100}
                          height={100}
                          className="rounded-lg object-contain"
                        />
                      </div>
                      <p className="text-gray-400 text-xs">
                        {field.state.value.split('/').pop() || 'pokemon.jpg'}
                      </p>
                    </>
                  )}

                  {!field.state.value && (
                    <p className="text-gray-500 text-xs">No field selected</p>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="types">
            {(field) => (
              <div>
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
                  disabled={isLoading}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div>
                <Textarea
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="min-h-[60px] resize-none border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Description"
                  disabled={isLoading}
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-3">
            <form.Field name="heightCm">
              {(field) => (
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Height"
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
                  placeholder="Weight"
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

          <form.Field name="abilities">
            {(field) => (
              <div>
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
              </div>
            )}
          </form.Field>

          <form.Field name="eggGroups">
            {(field) => (
              <div>
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
              </div>
            )}
          </form.Field>

          <form.Field name="evolutionDescription">
            {(field) => (
              <div>
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="min-h-[60px] resize-none border-gray-600 bg-gray-800 text-white placeholder-gray-400"
                  placeholder="Evolution description"
                  disabled={isLoading}
                />
              </div>
            )}
          </form.Field>

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

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="evolution-photo-input"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setUploadingEvolution(true)
                        try {
                          const url = await uploadFile(file)
                          if (url) {
                            field.handleChange(url)
                          }
                        } catch (error) {
                          console.error('Upload failed:', error)
                        } finally {
                          setUploadingEvolution(false)
                        }
                      }
                    }}
                    disabled={isLoading || uploadingEvolution}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mb-3 border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    disabled={isLoading || uploadingEvolution}
                    onClick={() =>
                      document.getElementById('evolution-photo-input')?.click()
                    }
                  >
                    {uploadingEvolution ? 'Uploading...' : 'Select field'}
                  </Button>

                  {field.state.value && (
                    <>
                      <div className="mb-3 flex justify-center">
                        <Image
                          src={field.state.value}
                          alt="Evolution preview"
                          width={100}
                          height={100}
                          className="rounded-lg object-contain"
                        />
                      </div>
                      <p className="text-gray-400 text-xs">
                        {field.state.value.split('/').pop() || 'evolution.jpg'}
                      </p>
                    </>
                  )}

                  {!field.state.value && (
                    <p className="text-gray-500 text-xs">No field selected</p>
                  )}
                </div>
              </div>
            )}
          </form.Field>

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
