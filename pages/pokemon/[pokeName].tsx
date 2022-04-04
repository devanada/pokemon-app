import React, { lazy, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import Section from "../../components/Section";

// const Layout = lazy(() => import("../../components/Layout"));
// const Section = lazy(() => import("../../components/Section"));

const TEXT_CLASSNAME =
  "text-xs sm:text-sm md:text-xl tracking-wide text-black dark:text-white";

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
      <div className="grid grid-flow-row auto-rows-max grid-cols-2">
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
              <p className={TEXT_CLASSNAME} key={item.slot}>
                {item.type.name}
              </p>
            ))}
          </div>
        </Section>
        <Section>
          {stats.map((item: any, index: number) => (
            <div key={index}>
              <p className={TEXT_CLASSNAME}>{item.stat.name}</p>
              <p className={TEXT_CLASSNAME}>{item.base_stat}</p>
            </div>
          ))}
        </Section>
        <Section fill>
          <p className={TEXT_CLASSNAME}>Name: {pokemon.name}</p>
          <p className={TEXT_CLASSNAME}>Weight: {pokemon.weight}</p>
          <p className={TEXT_CLASSNAME}>Height: {pokemon.height}</p>
        </Section>
        <Section>
          <ul className="list-disc list-outside ml-3">
            {abilities.map((item: any) => {
              return (
                !item.is_hidden && (
                  <li className={TEXT_CLASSNAME} key={item.slot}>
                    {item.ability.name}
                  </li>
                )
              );
            })}
          </ul>
        </Section>
        <Section>
          <ul className="list-disc list-outside ml-3">
            {moves.map((item: any, index: number) => (
              <li className={TEXT_CLASSNAME} key={index}>
                {item.move.name}
              </li>
            ))}
          </ul>
        </Section>
        <Section fill noBorder center>
          <Link href={`/battle/${pokemon.name}`}>
            <a className={`border border-white ${TEXT_CLASSNAME}`}>Catch!</a>
          </Link>
        </Section>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
