export type pokemonCard = {
  name: string;
  url?: string;
  alias?: string;
  fromMyPoke?: boolean;
  onClick?: () => void;
};
