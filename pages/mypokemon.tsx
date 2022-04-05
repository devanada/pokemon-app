import React, { lazy, useState, useEffect } from "react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { pokemonType } from "../types/index";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Card from "../components/Card";
// const Container = lazy(() => import("../components/Container"));
// const Layout = lazy(() => import("../components/Layout"));
// const Card = lazy(() => import("../components/Card"));

const Home = () => {
  const [pokemon, setPokemon] = useState<any>([]);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    console.log(getFromLocal);
    setPokemon(getFromLocal);
  }, []);

  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <div className="h-full">
        <Container>
          {pokemon.length !== 0 ? (
            pokemon.map((poke: any) => (
              <Card
                key={poke.name}
                name={poke.name}
                url={poke.sprites.other.dream_world.front_default}
                alias={poke.alias}
                fromMyPoke
              />
            ))
          ) : (
            <p>No Pokemon</p>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
