import React from "react";
import Image from "next/image";
import Link from "next/link";
import { pokemonCard } from "../types/pokemon";

const Card = (props: pokemonCard) => {
  return (
    <div className="m-2 border border-4 rounded-2xl border-black dark:border-white shadow-lg shadow-black">
      <Link href={`/pokemon/${props.name}`}>
        <a>
          <div className="flex justify-center">
            <Image
              src={
                props.url
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.url
                      .slice(34, 37)
                      .replace(/\/+$/, "")}.svg`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={props.name}
              width={200}
              height={200}
            />
          </div>
          <p className="text-xs sm:text-sm md:text-xl text-white uppercase text-center font-bold tracking-widest bg-black rounded-b-lg dark:rounded-b-xl">
            {props.name}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default Card;
