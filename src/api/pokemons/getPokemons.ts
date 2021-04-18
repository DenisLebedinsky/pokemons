import api from 'src/api/api'
import { GetPokemonsRequest, GetPokemonsResponse } from 'src/api/pokemons/types'

const getProcessingCards = async ({
  offset,
  limit,
}: GetPokemonsRequest): Promise<GetPokemonsResponse> => {
  return await api.get('pokemon', {
    params: {
      offset,
      limit,
    },
  })
}

export default getProcessingCards
