import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
const API_IMG = "https://api.eien-development.com/api/pokemon-api/pokemons/:id/sprite"

const pokemonTypes = {}

export default function PokemonItem({pokemon, handleClick, types, pokemonImages}) {
    // const [pokemonImage, setPokemonImage] = useState("/images/ball.png");
    const pokemonRef = useRef(null);
    let pokemonImage = "/images/ball.png";
    const pokemonFind = pokemonImages.find(pokemonImage => pokemonImage.pokemon_id === pokemon.id);
    if(pokemonFind) {
        pokemonImage = pokemonFind.image;
    }
    const handleClickItem = () => {
        const {x, y} = pokemonRef.current.getBoundingClientRect();
        handleClick({id: pokemon.id, top: y, left: x});
    }
    return (
    <div ref={pokemonRef} className={`p-list__item pokemon ${pokemon.legendary === 1 ? "legendary" : ""}`} onClick={handleClickItem}>
        <div className='p-list__inner'>
            <div className='pokemon__img'>
                <img src={pokemonImage} />
            </div>
            <div className='pokemon__id'>
                <span>#{pokemon.number}</span>
            </div>
            <p className='pokemon__name'>
                {pokemon.name}
            </p>
            <ul className="pokemon__types">
                {pokemon?.type_1 ? <li className="pokemon__type">
                    <img src={`/types/${types.find(type => type.id == pokemon?.type_1).name}.png`} alt={types.find(type => type.id == pokemon?.type_1).name} />
                </li> : ""}

                {pokemon?.type_2 ? <li className="pokemon__type">
                    <img src={`/types/${types.find(type => type.id == pokemon?.type_2).name}.png`} alt={types.find(type => type.id == pokemon?.type_2).name} />
                </li> : ""}

                {(!pokemon?.type_1 && !pokemon?.type_2) ? <li className="pokemon__type">
                    <img src="/types/Unknow.png" alt="" />
                </li> : "" }
            </ul>
            {pokemon.legendary == 1 && <p className='pokemon__legendary'>Legendary Pokemon</p>}
            <div className="pokemon__info">
                <div className="pokemon__data">
                    <span className='pokemon__txt'>HP</span>
                    <span className='pokemon__bar hp' style={{'--width': `${Math.round(pokemon.hp / 200 * 100)}%`}}>
                        <span className='pokemon__bar--value'>{pokemon.hp}</span>
                    </span>
                </div>
                <div className="pokemon__data">
                    <span className='pokemon__txt'>Attack</span>
                    <span className='pokemon__bar attack' style={{'--width': `${Math.round(pokemon.attack / 200 * 100)}%`}}>
                        <span className='pokemon__bar--value'>{pokemon.attack}</span>
                    </span>
                </div>
                <div className="pokemon__data">
                    <span className='pokemon__txt'>Defence</span>
                    <span className='pokemon__bar defence' style={{'--width': `${Math.round(pokemon.defense / 200 * 100)}%`}}>
                        <span className='pokemon__bar--value'>{pokemon.defense}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
    )
}
