import React, { lazy, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import Section from "../../components/Section";

// const Layout = lazy(() => import("../../components/Layout"));
// const Section = lazy(() => import("../../components/Section"));

const TEXT_CLASSNAME =
  "text-xs sm:text-sm md:text-xl text-left tracking-wide text-white";

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
    },
  };
}

const PokemonDetail = ({ pokemonName, pokemonImage }: any) => {
  const router = useRouter();

  const handleRun = () => {
    router.push("/");
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
      <div className="grid grid-flow-col grid-rows-2 w-full h-full z-0">
        <div className="grid justify-self-center place-content-between">
          <Section bgColor="bg-green-900">
            <p className={TEXT_CLASSNAME}>Wild {pokemonName} appear</p>
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
              <button className={TEXT_CLASSNAME}>CATCH</button>
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
