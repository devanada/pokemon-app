import React, { lazy } from "react";
import { pokemonType } from "../types/index";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Card from "../components/Card";
// const Container = lazy(() => import("../components/Container"));
// const Layout = lazy(() => import("../components/Layout"));
// const Card = lazy(() => import("../components/Card"));

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();

  return {
    props: { data: data, pokemons: data.results },
    revalidate: 1,
  };
}

const Home = ({ data, pokemons }: pokemonType) => {
  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <Container>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </Container>
    </Layout>
  );
};

export default Home;
