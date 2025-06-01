import Head from 'next/head'
import { PokeDevice } from '~/components/PokeDevice'

export default function Home() {
  const pokemonData = {
    name: 'Pikachu',
    pokedexNumber: 25,
    photoUrl: '/Pikachu.png',
    description:
      'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
    heightCm: 40,
    weightKg: 6.0,
    types: ['Electric'],
    genderFemaleRatio: 0.5,
    genderMaleRatio: 0.5,
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <>
      <Head>
        <title>Pokédex - Condorsoft</title>
        <meta
          name="description"
          content="Pokédx interface for Condorsoft technical test"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center p-8">
        <PokeDevice pokemonData={pokemonData} />
      </div>
    </>
  )
}
