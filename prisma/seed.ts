import { db } from '~/server/db'

async function main() {
  const grassType = await db.type.upsert({
    where: { name: 'grass' },
    update: {},
    create: { name: 'grass' },
  })

  const poisonType = await db.type.upsert({
    where: { name: 'poison' },
    update: {},
    create: { name: 'poison' },
  })

  const electricType = await db.type.upsert({
    where: { name: 'electric' },
    update: {},
    create: { name: 'electric' },
  })

  const fireType = await db.type.upsert({
    where: { name: 'fire' },
    update: {},
    create: { name: 'fire' },
  })

  const waterType = await db.type.upsert({
    where: { name: 'water' },
    update: {},
    create: { name: 'water' },
  })

  const overgrow = await db.ability.upsert({
    where: { name: 'overgrow' },
    update: {},
    create: { name: 'overgrow' },
  })

  const chlorophyll = await db.ability.upsert({
    where: { name: 'chlorophyll' },
    update: {},
    create: { name: 'chlorophyll' },
  })

  const staticAbility = await db.ability.upsert({
    where: { name: 'static' },
    update: {},
    create: { name: 'static' },
  })

  const blaze = await db.ability.upsert({
    where: { name: 'blaze' },
    update: {},
    create: { name: 'blaze' },
  })

  const torrent = await db.ability.upsert({
    where: { name: 'torrent' },
    update: {},
    create: { name: 'torrent' },
  })

  const monster = await db.eggGroup.upsert({
    where: { name: 'monster' },
    update: {},
    create: { name: 'monster' },
  })

  const grassEggGroup = await db.eggGroup.upsert({
    where: { name: 'grass' },
    update: {},
    create: { name: 'grass' },
  })

  const field = await db.eggGroup.upsert({
    where: { name: 'field' },
    update: {},
    create: { name: 'field' },
  })

  const fairy = await db.eggGroup.upsert({
    where: { name: 'fairy' },
    update: {},
    create: { name: 'fairy' },
  })

  const bulbasaur = await db.pokemon.upsert({
    where: { pokedexNumber: 1 },
    update: {},
    create: {
      name: 'Bulbasaur',
      pokedexNumber: 1,
      photoUrl: '/Pikachu.png',
      description:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      heightCm: 70,
      weightKg: 6.9,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: {
        create: [
          { type: { connect: { id: grassType.id } } },
          { type: { connect: { id: poisonType.id } } },
        ],
      },
      abilities: {
        create: [
          { ability: { connect: { id: overgrow.id } } },
          { ability: { connect: { id: chlorophyll.id } } },
        ],
      },
      eggGroups: {
        create: [
          { eggGroup: { connect: { id: monster.id } } },
          { eggGroup: { connect: { id: grassEggGroup.id } } },
        ],
      },
    },
  })

  const ivysaur = await db.pokemon.upsert({
    where: { pokedexNumber: 2 },
    update: {},
    create: {
      name: 'Ivysaur',
      pokedexNumber: 2,
      photoUrl: '/Raichu.png',
      description:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      heightCm: 100,
      weightKg: 13.0,
      genderFemaleRatio: 0.125,
      genderMaleRatio: 0.875,
      types: {
        create: [
          { type: { connect: { id: grassType.id } } },
          { type: { connect: { id: poisonType.id } } },
        ],
      },
      abilities: {
        create: [
          { ability: { connect: { id: overgrow.id } } },
          { ability: { connect: { id: chlorophyll.id } } },
        ],
      },
      eggGroups: {
        create: [
          { eggGroup: { connect: { id: monster.id } } },
          { eggGroup: { connect: { id: grassEggGroup.id } } },
        ],
      },
    },
  })

  const pikachu = await db.pokemon.upsert({
    where: { pokedexNumber: 25 },
    update: {},
    create: {
      name: 'Pikachu',
      pokedexNumber: 25,
      photoUrl: '/Pikachu.png',
      description:
        'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
      heightCm: 40,
      weightKg: 6.0,
      genderFemaleRatio: 0.5,
      genderMaleRatio: 0.5,
      types: {
        create: [{ type: { connect: { id: electricType.id } } }],
      },
      abilities: {
        create: [{ ability: { connect: { id: staticAbility.id } } }],
      },
      eggGroups: {
        create: [
          { eggGroup: { connect: { id: field.id } } },
          { eggGroup: { connect: { id: fairy.id } } },
        ],
      },
    },
  })

  const raichu = await db.pokemon.upsert({
    where: { pokedexNumber: 26 },
    update: {},
    create: {
      name: 'Raichu',
      pokedexNumber: 26,
      photoUrl: '/Raichu.png',
      description:
        'Its long tail serves as a ground to protect itself from its own high-voltage power.',
      heightCm: 80,
      weightKg: 30.0,
      genderFemaleRatio: 0.5,
      genderMaleRatio: 0.5,
      types: {
        create: [{ type: { connect: { id: electricType.id } } }],
      },
      abilities: {
        create: [{ ability: { connect: { id: staticAbility.id } } }],
      },
      eggGroups: {
        create: [
          { eggGroup: { connect: { id: field.id } } },
          { eggGroup: { connect: { id: fairy.id } } },
        ],
      },
    },
  })

  await db.evolution.upsert({
    where: { id: 1 },
    update: {},
    create: {
      fromId: bulbasaur.id,
      toId: ivysaur.id,
      method: 'level 16',
    },
  })

  await db.evolution.upsert({
    where: { id: 2 },
    update: {},
    create: {
      fromId: pikachu.id,
      toId: raichu.id,
      method: 'Thunder Stone',
    },
  })

  console.log('✅ Database seeded successfully!')
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
