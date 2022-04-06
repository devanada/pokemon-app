import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { pokemonCard } from "../types/pokemon";

const Card = (props: pokemonCard) => {
  return (
    <div className="m-2 border border-4 rounded-2xl border-black dark:border-white shadow-lg shadow-black">
      <div className="flex justify-end">
        {props.fromMyPoke && (
          <AiOutlineClose
            className="w-8 h-8 text-black dark:text-white justify-items-end"
            onClick={props.onClick}
          />
        )}
      </div>
      <Link href={`/pokemon/${props.name}`}>
        <a>
          <div className="flex justify-center">
            <Image
              src={
                props.fromMyPoke
                  ? props.url ||
                    "https://via.placeholder.com/500x750?text=No+Image"
                  : props.url
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
          <p className="font-arcade text-xs text-white uppercase text-center font-bold tracking-widest bg-black rounded-b-lg dark:rounded-b-xl py-2">
            {props.name}
            {props.alias && <br />}
            {props.alias && `(${props.alias})`}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default Card;
