import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import type { NextPage } from "next";

import { DataHome, PokemonMeta } from "utils/types/pages";
import Container from "components/Container";
import Layout from "components/Layout";
import Card from "components/Card";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { offset } = context.query;
  const url = offset
    ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    : "https://pokeapi.co/api/v2/pokemon";
  const { data } = await axios.get(url);
  const trimmedData: PokemonMeta = {
    count: data.count,
    next: data.next,
    previous: data.previous,
  };

  return {
    props: { meta: trimmedData, pokemons: data.results },
  };
}

const Home: NextPage<DataHome> = ({ meta, pokemons }) => {
  const router = useRouter();

  const handleNavigation = async (endpoint: string) => {
    let params = new URLSearchParams(new URL(endpoint).search);
    let offset = params.get("offset");
    router.push(`/?offset=${offset}`);
  };

  return (
    <Layout
      title="Pokemon App"
      description="Place where you can catch a Pokemon and name it yourself!"
    >
      <Container>
        {pokemons.map((poke) => (
          <Card key={poke.name} name={poke.name} url={poke.url} />
        ))}
        <div className="col-span-2 flex justify-between">
          <FaCaretLeft
            className={`h-10 w-10 ${
              meta.previous
                ? "cursor-pointer text-black dark:text-white"
                : "cursor-default text-slate-600"
            }`}
            onClick={() => meta.previous && handleNavigation(meta.previous)}
          />
          <FaCaretRight
            className={`h-10 w-10 ${
              meta.next
                ? "cursor-pointer text-black dark:text-white"
                : "cursor-default text-slate-600"
            }`}
            onClick={() => meta.next && handleNavigation(meta.next)}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
