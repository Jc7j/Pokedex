export interface PokemonEvolution {
  method: string // Evolution method/description: "Level 16", "Fire Stone", "Trade"
  photoUrl?: string // URL to evolution photo/image
  toPokemonName?: string // Name of the Pokemon it evolves into: "Raichu", "Charizard"
}
