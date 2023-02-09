import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

import { PokemonDetail } from "utils/types/pokemon";
import Container from "components/Container";
import Layout from "components/Layout";
import Card from "components/Card";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setPokemon(getFromLocal);
  }, []);

  const handleRemove = (item: PokemonDetail) => {
    const filterData = pokemon.filter((pokemon) => pokemon !== item);
    localStorage.setItem("myPokemons", JSON.stringify(filterData));
    setPokemon(filterData);
  };

  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <div className="h-full">
        {pokemon.length !== 0 ? (
          <Container>
            {pokemon.map((poke) => (
              <Card
                key={poke.name}
                name={poke.name}
                url={poke.sprites.other.dream_world.front_default}
                alias={poke.alias}
                fromMyPoke
                onClick={() => handleRemove(poke)}
              />
            ))}
          </Container>
        ) : (
          <p className="text-center font-arcade text-white">No Pokemon</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
