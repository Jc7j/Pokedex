import Head from 'next/head'
import { PokeDevice } from '~/components/PokeDevice'

//
export default function Home() {
  // Hardcoded Pokémon data for now
  const pokemonData = {
    name: 'Pikachu',
    number: 25,
    type: 'Electric',
    description:
      'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
    height: '1\' 04"',
    weight: '13.2 lbs',
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
