import React, { lazy, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import Section from "../../components/Section";

// const Layout = lazy(() => import("../../components/Layout"));
// const Section = lazy(() => import("../../components/Section"));

const TEXT_CLASSNAME: string =
    "text-xs sm:text-sm md:text-xl tracking-wide text-black dark:text-white capitalize break-all",
  COLOR_TYPE: any = {
    normal: "bg-transparent",
    fighting: "bg-blue-900",
    flying: "bg-emerald-300",
    poison: "bg-lime-600",
    ground: "bg-yellow-800",
    rock: "bg-stone-700",
    bug: "bg-stone-400",
    ghost: "bg-stone-500",
    steel: "bg-slate-500",
    fire: "bg-orange-600",
    water: "bg-blue-200",
    grass: "bg-emerald-800",
    electric: "bg-yellow-200",
    psychic: "bg-teal-200",
    ice: "bg-blue-400",
    dragon: "bg-red-900",
    dark: "bg-black",
    fairy: "bg-rose-500",
    unknown: "bg-stone-800",
    shadow: "bg-neutral-600",
  };

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
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4">
            {types.map((item: any) => (
              <p
                className={`${TEXT_CLASSNAME} text-center border border-black dark:border-white rounded-xl p-2 ${
                  COLOR_TYPE[item.type.name]
                }`}
                key={item.slot}
              >
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
            <a
              className={`border-2 border-black dark:border-white ${TEXT_CLASSNAME} font-bold place-self-center p-2 rounded-xl shadow-md shadow-black`}
            >
              Catch!
            </a>
          </Link>
        </Section>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
