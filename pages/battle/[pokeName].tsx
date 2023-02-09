import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import type { NextPage } from "next";

import { PokemonDetail } from "utils/types/pokemon";
import { BattlePage } from "utils/types/pages";
import Section from "components/Section";
import Layout from "components/Layout";
import Modal from "components/Modal";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pokeName } = context.query;
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeName}`
  );

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    props: {
      name: capitalizeFirstLetter(data.name),
      image: data.sprites.front_default,
      pokemon: data,
    },
  };
}

const PokemonBattle: NextPage<BattlePage> = (props) => {
  const { name, image, pokemon } = props;
  const [alias, setAlias] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const handleRun = () => {
    router.push("/");
  };

  const handleCatch = () => {
    var halfChance = Math.random() * 100;
    if (halfChance > 50) {
      setShowModal(true);
    } else {
      alert("You missed!");
    }
  };

  const submitMyPokemon = () => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    const findIfExist = getFromLocal.find(
      (x: PokemonDetail) => x.alias == alias
    );
    if (findIfExist) {
      alert(`Alias ${alias} is already exist!`);
    } else {
      const dupe = Object.assign({}, pokemon);
      dupe.alias = alias;
      getFromLocal.push(dupe);
      localStorage.setItem("myPokemons", JSON.stringify(getFromLocal));
      router.push("/");
    }
  };

  return (
    <Layout
      title={`${name} - Battle`}
      description={`Commencing battle with wild ${name}`}
    >
      <div className="grid h-full w-full grid-flow-col grid-rows-2 bg-[url('/battleground.png')] bg-cover bg-center bg-repeat">
        <div className="grid place-content-between justify-self-center">
          <Section bgColor="bg-green-900">
            <p className="text-center font-arcade text-xs tracking-wide text-white">
              Wild {name} appear
            </p>
          </Section>
          <Image
            className="place-self-center self-end"
            src={
              image
                ? image
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={name}
            width={200}
            height={200}
          />
        </div>
        <div className="grid auto-rows-max grid-cols-2 self-end">
          <Section bgColor="bg-cyan-800">
            <p className="text-left font-arcade text-xs tracking-wide text-white">
              What will
            </p>
            <p className="text-left font-arcade text-xs tracking-wide text-white">
              You do?
            </p>
          </Section>
          <Section bgColor="bg-yellow-700">
            <div className="grid auto-rows-max grid-cols-2">
              <button
                className="text-left font-arcade text-xs tracking-wide text-white"
                onClick={() => handleCatch()}
              >
                CATCH
              </button>
              <button
                className="text-left font-arcade text-xs tracking-wide text-white"
                onClick={() => handleRun()}
              >
                RUN
              </button>
            </div>
          </Section>
        </div>
      </div>
      <Modal show={showModal}>
        <div className="mb-5">
          <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            Congratulation!
          </p>
          <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            You caught {name}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label className="block">
            <span className="block font-arcade text-sm font-medium text-neutral-800 dark:text-white">
              Nickname
            </span>
            <input
              className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 font-arcade text-xs shadow-sm placeholder:italic focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="text"
              onChange={(e) => setAlias(e.target.value)}
            />
          </label>
          <button
            className="mt-4 rounded-xl border p-3 text-center font-arcade text-xs tracking-wide text-neutral-800 dark:text-white"
            onClick={() => submitMyPokemon()}
          >
            Submit
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default PokemonBattle;
