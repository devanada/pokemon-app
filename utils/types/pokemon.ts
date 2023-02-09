export interface PokemonDetail {
  name: string;
  weight: number;
  height: number;
  url?: string;
  alias?: string;
  fromMyPoke?: boolean;
  onClick?: () => void;
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }
  ];
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }
  ];
  moves: [
    {
      move: {
        name: string;
        url: string;
      };
    }
  ];
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
