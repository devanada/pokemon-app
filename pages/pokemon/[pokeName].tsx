import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import type { NextPage } from "next";

import { DetailPage } from "utils/types/pages";
import Section from "components/Section";
import Layout from "components/Layout";

const COLOR_TYPE: { [key: string]: string } = {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pokeName } = context.query;
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeName}`
  );

  return {
    props: {
      pokemon: data,
    },
  };
}

const PokemonDetail: NextPage<DetailPage> = (props) => {
  const { types, stats, abilities, moves, sprites, name, weight, height } =
    props.pokemon;

  return (
    <Layout
      title={`${name} - Pokédex`}
      description={`Detailed information about ${name}`}
    >
      <div className="grid h-full grid-flow-row auto-rows-max grid-cols-2">
        <Section center>
          <Image
            src={
              sprites.other.dream_world.front_default
                ? sprites.other.dream_world.front_default
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={name}
            width={200}
            height={200}
          />
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4">
            {types.map((item) => (
              <p
                className={`overflow-hidden break-all rounded-full border border-black p-2 text-center font-arcade text-xs capitalize tracking-wide text-white dark:border-white ${
                  COLOR_TYPE[item.type.name]
                }`}
                key={item.slot}
              >
                {item.type.name}
              </p>
            ))}
          </div>
        </Section>
        <Section center>
          {stats.map((item, index) => (
            <div key={index} className="w-full">
              <p className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white">
                {item.stat.name}
              </p>
              <div className="h-1 w-full bg-gray-400 dark:bg-gray-200">
                <div
                  className="h-1 bg-blue-600"
                  style={{
                    width: `${item.base_stat <= 100 ? item.base_stat : 100}%`,
                  }}
                />
              </div>
              <p className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white">
                {item.base_stat}
              </p>
            </div>
          ))}
        </Section>
        <Section fill>
          <p className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white">
            Name: {name}
          </p>
          <p className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white">
            Weight: {weight}
          </p>
          <p className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white">
            Height: {height}
          </p>
        </Section>
        <Section>
          <ul className="ml-3 list-outside list-disc">
            {abilities.map((item) => {
              return (
                !item.is_hidden && (
                  <li
                    className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white"
                    key={item.slot}
                  >
                    {item.ability.name}
                  </li>
                )
              );
            })}
          </ul>
        </Section>
        <Section>
          <ul className="ml-3 list-outside list-disc">
            {moves.slice(0, 5).map((item, index) => (
              <li
                className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white"
                key={index}
              >
                {item.move.name}
              </li>
            ))}
          </ul>
        </Section>
        <Section fill noBorder center>
          <Link
            href={`/battle/${name}`}
            className={`$font-arcade place-self-center overflow-hidden break-all rounded-xl border-2 border-black p-2 text-xs font-bold capitalize tracking-wide text-black shadow-md shadow-black hover:ring dark:border-white dark:text-white`}
            passHref
          >
            Catch!
          </Link>
        </Section>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
