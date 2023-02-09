import { AiOutlineClose } from "react-icons/ai";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { CardType } from "utils/types/components";

const Card: FC<CardType> = (props) => {
  const { name, alias, fromMyPoke, onClick, url } = props;

  return (
    <div className="flex h-full flex-col rounded-2xl border-4 border-black shadow-lg shadow-black dark:border-white">
      {fromMyPoke && (
        <div className="flex justify-end">
          <AiOutlineClose
            className="h-8 w-8 justify-items-end text-black dark:text-white"
            onClick={onClick}
          />
        </div>
      )}
      <Link
        className="flex h-full flex-col items-center justify-between"
        href={`/pokemon/${name}`}
        passHref
      >
        <div className="flex h-full w-full items-center justify-center">
          <Image
            className="h-auto w-auto"
            src={
              fromMyPoke
                ? url || "https://via.placeholder.com/500x750?text=No+Image"
                : url
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${url
                    .slice(34)
                    .replace(/\/+$/, "")}.svg`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={name}
            width={170}
            height={200}
          />
        </div>
        <p className="w-full rounded-b-lg bg-black py-2 text-center font-arcade text-xs font-bold uppercase tracking-widest text-white dark:rounded-b-xl">
          {name}
          {alias && <br />}
          {alias && `(${alias})`}
        </p>
      </Link>
    </div>
  );
};

export default Card;
