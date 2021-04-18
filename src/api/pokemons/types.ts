export interface GetPokemonsRequest {
  offset: number
  limit: number
}

export interface GetPokemonsResponse {
  results: PokemonPreview[]
  count: number
}

export type PokemonPreview = {
  name: string
  url: string
}
