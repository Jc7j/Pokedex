/*
  Warnings:

  - You are about to drop the `Ability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EggGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evolution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonAbility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonEggGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PokemonType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evolution" DROP CONSTRAINT "Evolution_fromId_fkey";

-- DropForeignKey
ALTER TABLE "Evolution" DROP CONSTRAINT "Evolution_toId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonAbility" DROP CONSTRAINT "PokemonAbility_abilityId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonAbility" DROP CONSTRAINT "PokemonAbility_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonEggGroup" DROP CONSTRAINT "PokemonEggGroup_eggGroupId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonEggGroup" DROP CONSTRAINT "PokemonEggGroup_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonType" DROP CONSTRAINT "PokemonType_pokemonId_fkey";

-- DropForeignKey
ALTER TABLE "PokemonType" DROP CONSTRAINT "PokemonType_typeId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "abilities" TEXT,
ADD COLUMN     "eggGroups" TEXT,
ADD COLUMN     "evolution" JSONB,
ADD COLUMN     "types" TEXT;

-- DropTable
DROP TABLE "Ability";

-- DropTable
DROP TABLE "EggGroup";

-- DropTable
DROP TABLE "Evolution";

-- DropTable
DROP TABLE "PokemonAbility";

-- DropTable
DROP TABLE "PokemonEggGroup";

-- DropTable
DROP TABLE "PokemonType";

-- DropTable
DROP TABLE "Type";
