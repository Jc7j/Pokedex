import { db } from '~/server/db'

/*
-- SQL QUERIES FOR NEON POSTGRES
-- Copy and paste these INSERT statements directly into your Neon PostgreSQL console:

INSERT INTO "Pokemon" (
  "name", "pokedexNumber", "photoUrl", "description", "heightCm", "weightKg", 
  "genderFemaleRatio", "genderMaleRatio", "types", "abilities", "eggGroups", "evolution",
  "createdAt", "updatedAt"
) VALUES 
  ('Bulbasaur', 1, '/Pikachu.png', 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.', 70, 6.9, 0.125, 0.875, 'Grass, Poison', 'Overgrow, Chlorophyll', 'Monster, Grass', '{"method": "Level 16", "photoUrl": "/Raichu.png", "toPokemonName": "Ivysaur"}', NOW(), NOW()),
  ('Ivysaur', 2, '/Raichu.png', 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.', 100, 13.0, 0.125, 0.875, 'Grass, Poison', 'Overgrow, Chlorophyll', 'Monster, Grass', '{"method": "Level 32", "photoUrl": "/Pikachu.png", "toPokemonName": "Venusaur"}', NOW(), NOW()),
  ('Venusaur', 3, '/Pikachu.png', 'The flower on its back releases a soothing scent that enhances emotions.', 200, 100.0, 0.125, 0.875, 'Grass, Poison', 'Overgrow, Chlorophyll', 'Monster, Grass', NULL, NOW(), NOW()),
  ('Charmander', 4, '/Raichu.png', 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.', 60, 8.5, 0.125, 0.875, 'Fire', 'Blaze, Solar Power', 'Monster, Dragon', '{"method": "Level 16", "photoUrl": "/Pikachu.png", "toPokemonName": "Charmeleon"}', NOW(), NOW()),
  ('Charmeleon', 5, '/Pikachu.png', 'When it swings its burning tail, it elevates the temperature to unbearably hot levels.', 110, 19.0, 0.125, 0.875, 'Fire', 'Blaze, Solar Power', 'Monster, Dragon', '{"method": "Level 36", "photoUrl": "/Raichu.png", "toPokemonName": "Charizard"}', NOW(), NOW()),
  ('Charizard', 6, '/Raichu.png', 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.', 170, 90.5, 0.125, 0.875, 'Fire, Flying', 'Blaze, Solar Power', 'Monster, Dragon', NULL, NOW(), NOW()),
  ('Squirtle', 7, '/Pikachu.png', 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.', 50, 9.0, 0.125, 0.875, 'Water', 'Torrent, Rain Dish', 'Monster, Water 1', '{"method": "Level 16", "photoUrl": "/Raichu.png", "toPokemonName": "Wartortle"}', NOW(), NOW()),
  ('Wartortle', 8, '/Raichu.png', 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.', 100, 22.5, 0.125, 0.875, 'Water', 'Torrent, Rain Dish', 'Monster, Water 1', '{"method": "Level 36", "photoUrl": "/Pikachu.png", "toPokemonName": "Blastoise"}', NOW(), NOW()),
  ('Blastoise', 9, '/Pikachu.png', 'A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.', 160, 85.5, 0.125, 0.875, 'Water', 'Torrent, Rain Dish', 'Monster, Water 1', NULL, NOW(), NOW()),
  ('Pikachu', 25, '/Pikachu.png', 'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.', 40, 6.0, 0.5, 0.5, 'Electric', 'Static, Lightning Rod', 'Field, Fairy', '{"method": "Thunder Stone", "photoUrl": "/Raichu.png", "toPokemonName": "Raichu"}', NOW(), NOW()),
  ('Raichu', 26, '/Raichu.png', 'Its long tail serves as a ground to protect itself from its own high-voltage power.', 80, 30.0, 0.5, 0.5, 'Electric', 'Static, Lightning Rod', 'Field, Fairy', NULL, NOW(), NOW())
ON CONFLICT ("pokedexNumber") DO NOTHING;

-- Alternative: If you want to update existing records instead of ignoring conflicts:
-- ON CONFLICT ("pokedexNumber") DO UPDATE SET
--   "name" = EXCLUDED."name",
--   "photoUrl" = EXCLUDED."photoUrl",
--   "description" = EXCLUDED."description",
--   "heightCm" = EXCLUDED."heightCm",
--   "weightKg" = EXCLUDED."weightKg",
--   "genderFemaleRatio" = EXCLUDED."genderFemaleRatio",
--   "genderMaleRatio" = EXCLUDED."genderMaleRatio",
--   "types" = EXCLUDED."types",
--   "abilities" = EXCLUDED."abilities",
--   "eggGroups" = EXCLUDED."eggGroups",
--   "evolution" = EXCLUDED."evolution",
--   "updatedAt" = NOW();
*/

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
