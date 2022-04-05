import React, { lazy, useState } from "react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
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
  const trimmedData = {
    count: data.count,
    next: data.next,
    previous: data.previous,
  };

  return {
    props: { data: trimmedData, pokemons: data.results },
    revalidate: 1,
  };
}

const Home = ({ data, pokemons }: pokemonType) => {
  const [pokemon, setPokemon] = useState(pokemons);
  const [datas, setDatas] = useState(data);

  const handleNavigation = async (endpoint: string) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    const trimmedData: any = {
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
    setDatas(trimmedData);
    setPokemon(data.results);
  };

  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <Container>
        {pokemon.map((poke) => (
          <Card key={poke.name} name={poke.name} url={poke.url} />
        ))}
        <div className="flex justify-between col-span-2">
          <FaCaretLeft
            className={`w-10 h-10 ${
              datas.previous
                ? "text-black dark:text-white cursor-pointer"
                : "text-slate-600 cursor-default"
            }`}
            onClick={() => datas.previous && handleNavigation(datas.previous)}
          />
          <FaCaretRight
            className={`w-10 h-10 ${
              datas.next
                ? "text-black dark:text-white cursor-pointer"
                : "text-slate-600 cursor-default"
            }`}
            onClick={() => datas.next && handleNavigation(datas.next)}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
