import React, { lazy, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Section from "../../components/Section";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";

// const Layout = lazy(() => import("../../components/Layout"));
// const Section = lazy(() => import("../../components/Section"));

const TEXT_CLASSNAME = "font-arcade text-xs text-left tracking-wide text-white";

export async function getServerSideProps(context: any) {
  const { pokeName } = context.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  const data = await res.json();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    props: {
      pokemonName: capitalizeFirstLetter(data.name),
      pokemonImage: data.sprites.front_default,
      pokemonData: data,
    },
  };
}

const PokemonDetail = ({ pokemonName, pokemonImage, pokemonData }: any) => {
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
    const findIfExist = getFromLocal.find((x: any) => x.alias == alias);
    if (findIfExist) {
      alert(`Alias ${alias} is already exist!`);
    } else {
      const dupe = Object.assign({}, pokemonData);
      dupe.alias = alias;
      getFromLocal.push(dupe);
      localStorage.setItem("myPokemons", JSON.stringify(getFromLocal));
      router.push("/");
    }
  };

  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <div className="fixed w-full md:w-1/2 h-full">
        <Image
          alt="Battleground"
          src="/battleground.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <Modal show={showModal}>
        <div className="mb-5">
          <p className={TEXT_CLASSNAME + " font-bold text-center"}>
            Congratulation!
          </p>
          <p className={TEXT_CLASSNAME + " font-bold text-center"}>
            You caught {pokemonName}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label className="block">
            <span className="block font-arcade text-sm font-medium text-slate-700">
              Nickname
            </span>
            <input
              className="placeholder:italic block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xs font-arcade"
              type="text"
              onChange={(e) => setAlias(e.target.value)}
            />
          </label>
          <button
            className={
              TEXT_CLASSNAME + " border p-3 rounded-xl text-center mt-4"
            }
            onClick={() => submitMyPokemon()}
          >
            Submit
          </button>
        </div>
      </Modal>
      <div className="grid grid-flow-col grid-rows-2 w-full h-full z-0">
        <div className="grid justify-self-center place-content-between">
          <Section bgColor="bg-green-900">
            <p className={TEXT_CLASSNAME + " text-center"}>
              Wild {pokemonName} appear
            </p>
          </Section>
          <Image
            className="place-self-center self-end"
            src={
              pokemonImage
                ? pokemonImage
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={pokemonName}
            width={200}
            height={200}
          />
        </div>
        <div className="grid auto-rows-max grid-cols-2 self-end">
          <Section bgColor="bg-cyan-800">
            <p className={TEXT_CLASSNAME}>What will</p>
            <p className={TEXT_CLASSNAME}>You do?</p>
          </Section>
          <Section bgColor="bg-yellow-700">
            <div className="grid auto-rows-max grid-cols-2">
              <button className={TEXT_CLASSNAME} onClick={() => handleCatch()}>
                CATCH
              </button>
              <button className={TEXT_CLASSNAME} onClick={() => handleRun()}>
                RUN
              </button>
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
