type dataType = {
  count: number;
  next: string;
  previous: string | null;
  results: resultType[];
};

type resultType = {
  name: string;
  url: string;
};

export type pokemonType = {
  data: dataType;
  pokemons: resultType[];
};
