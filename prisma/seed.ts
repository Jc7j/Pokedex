import { db } from '~/server/db'

async function main() {
  const pokemonData = [
    {
      name: 'Bulbasaur',
      pokedexNumber: 1,
      photoUrl: '/Pikachu.png',
      description:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      heightCm: 70,
      weightKg: 6.9,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Grass, Poison',
      abilities: 'Overgrow, Chlorophyll',
      eggGroups: 'Monster, Grass',
      evolution: {
        method: 'Level 16',
        photoUrl: '/Raichu.png',
        toPokemonName: 'Ivysaur',
      },
    },
    {
      name: 'Ivysaur',
      pokedexNumber: 2,
      photoUrl: '/Raichu.png',
      description:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      heightCm: 100,
      weightKg: 13.0,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Grass, Poison',
      abilities: 'Overgrow, Chlorophyll',
      eggGroups: 'Monster, Grass',
      evolution: {
        method: 'Level 32',
        photoUrl: '/Pikachu.png',
        toPokemonName: 'Venusaur',
      },
    },
    {
      name: 'Venusaur',
      pokedexNumber: 3,
      photoUrl: '/Pikachu.png',
      description:
        'The flower on its back releases a soothing scent that enhances emotions.',
      heightCm: 200,
      weightKg: 100.0,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Grass, Poison',
      abilities: 'Overgrow, Chlorophyll',
      eggGroups: 'Monster, Grass',
    },
    {
      name: 'Charmander',
      pokedexNumber: 4,
      photoUrl: '/Raichu.png',
      description:
        'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
      heightCm: 60,
      weightKg: 8.5,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Fire',
      abilities: 'Blaze, Solar Power',
      eggGroups: 'Monster, Dragon',
      evolution: {
        method: 'Level 16',
        photoUrl: '/Pikachu.png',
        toPokemonName: 'Charmeleon',
      },
    },
    {
      name: 'Charmeleon',
      pokedexNumber: 5,
      photoUrl: '/Pikachu.png',
      description:
        'When it swings its burning tail, it elevates the temperature to unbearably hot levels.',
      heightCm: 110,
      weightKg: 19.0,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Fire',
      abilities: 'Blaze, Solar Power',
      eggGroups: 'Monster, Dragon',
      evolution: {
        method: 'Level 36',
        photoUrl: '/Raichu.png',
        toPokemonName: 'Charizard',
      },
    },
    {
      name: 'Charizard',
      pokedexNumber: 6,
      photoUrl: '/Raichu.png',
      description:
        'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
      heightCm: 170,
      weightKg: 90.5,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Fire, Flying',
      abilities: 'Blaze, Solar Power',
      eggGroups: 'Monster, Dragon',
    },
    {
      name: 'Squirtle',
      pokedexNumber: 7,
      photoUrl: '/Pikachu.png',
      description:
        'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
      heightCm: 50,
      weightKg: 9.0,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Water',
      abilities: 'Torrent, Rain Dish',
      eggGroups: 'Monster, Water 1',
      evolution: {
        method: 'Level 16',
        photoUrl: '/Raichu.png',
        toPokemonName: 'Wartortle',
      },
    },
    {
      name: 'Wartortle',
      pokedexNumber: 8,
      photoUrl: '/Raichu.png',
      description:
        'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.',
      heightCm: 100,
      weightKg: 22.5,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Water',
      abilities: 'Torrent, Rain Dish',
      eggGroups: 'Monster, Water 1',
      evolution: {
        method: 'Level 36',
        photoUrl: '/Pikachu.png',
        toPokemonName: 'Blastoise',
      },
    },
    {
      name: 'Blastoise',
      pokedexNumber: 9,
      photoUrl: '/Pikachu.png',
      description:
        'A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.',
      heightCm: 160,
      weightKg: 85.5,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: 'Water',
      abilities: 'Torrent, Rain Dish',
      eggGroups: 'Monster, Water 1',
    },
    {
      name: 'Pikachu',
      pokedexNumber: 25,
      photoUrl: '/Pikachu.png',
      description:
        'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
      heightCm: 40,
      weightKg: 6.0,
      genderFemaleRatio: 0.5,
      genderMaleRatio: 0.5,
      types: 'Electric',
      abilities: 'Static, Lightning Rod',
      eggGroups: 'Field, Fairy',
      evolution: {
        method: 'Thunder Stone',
        photoUrl: '/Raichu.png',
        toPokemonName: 'Raichu',
      },
    },
    {
      name: 'Raichu',
      pokedexNumber: 26,
      photoUrl: '/Raichu.png',
      description:
        'Its long tail serves as a ground to protect itself from its own high-voltage power.',
      heightCm: 80,
      weightKg: 30.0,
      genderFemaleRatio: 0.5,
      genderMaleRatio: 0.5,
      types: 'Electric',
      abilities: 'Static, Lightning Rod',
      eggGroups: 'Field, Fairy',
    },
  ]

  const pokemonPromises = pokemonData.map((pokemon) =>
    db.pokemon.upsert({
      where: { pokedexNumber: pokemon.pokedexNumber },
      update: {},
      create: pokemon,
    })
  )

  await Promise.all(pokemonPromises)

  console.log('✅ Database seeded successfully with 11 Pokemon!')
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await db.$disconnect()
    process.exit(1)
  })
