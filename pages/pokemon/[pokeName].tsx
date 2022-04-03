import React, { lazy } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import Section from "../../components/Section";

// const Layout = lazy(() => import("../../components/Layout"));
// const Section = lazy(() => import("../../components/Section"));

export async function getServerSideProps(context: any) {
  const { pokeName } = context.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  const data = await res.json();
  const moves = data.moves.slice(0, 5);

  return {
    props: {
      pokemon: data,
      types: data.types,
      stats: data.stats,
      abilities: data.abilities,
      moves,
    },
  };
}

const PokemonDetail = ({ pokemon, types, stats, abilities, moves }: any) => {
  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 h-full">
        <Section center>
          <Image
            src={
              pokemon.sprites.other.dream_world.front_default
                ? pokemon.sprites.other.dream_world.front_default
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={pokemon.name}
            width={200}
            height={200}
          />
          <div className="flex justify-around">
            {types.map((item: any) => (
              <div key={item.slot}>
                <p>{item.type.name}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section>
          {stats.map((item: any, index: number) => (
            <div key={index}>
              <p>{item.stat.name}</p>
              <p>{item.base_stat}</p>
            </div>
          ))}
        </Section>
        <Section fill>
          <p>Name: {pokemon.name}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
        </Section>
        <Section>
          {abilities.map((item: any) => (
            <div key={item.slot}>
              <p>{!item.is_hidden && item.ability.name}</p>
            </div>
          ))}
        </Section>
        <Section>
          {moves.map((item: any, index: number) => (
            <div key={index}>
              <p>{item.move.name}</p>
            </div>
          ))}
        </Section>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
