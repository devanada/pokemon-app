import { PokemonDetail } from "./pokemon";

export interface AllPokemon {
  name: string;
  url: string;
}

export interface PokemonMeta {
  count: number;
  next: string | null;
  previous: string | null;
  results?: AllPokemon[];
}

export interface DataHome {
  meta: PokemonMeta;
  pokemons: AllPokemon[];
}

export interface DetailPage {
  pokemon: PokemonDetail;
}

export interface BattlePage {
  pokemon: PokemonDetail;
  name: string;
  image: string;
}
