import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
const API_IMG = "https://api.eien-development.com/api/pokemon-api/pokemons/:id/sprite"

const pokemonTypes = {}

export default function PokemonItem({pokemon, handleClick, types}) {
    const [pokemonImage, setPokemonImage] = useState("/images/ball.png");
    const pokemonRef = useRef(null);
    const handleClickItem = () => {
        const {x, y} = pokemonRef.current.getBoundingClientRect();
        handleClick({id: pokemon.id, top: y, left: x});
    }
    return (
    <div ref={pokemonRef} className={`p-list__item pokemon ${pokemon.legendary === 1 ? "legendary" : ""}`} onClick={handleClickItem}>
        <div className='`p-list__inner'>
            <div className='pokemon__img'>
                <img src={pokemonImage} />
            </div>
            <div className='pokemon__id'>
                <span>#{pokemon.number}</span>
            </div>
            <div className='pokemon__name'>
                {pokemon.name}
            </div>
            <div className="pokemon__types">
                {pokemon?.type_1 ? <div className="pokemon__type">
                    <img src={`/types/${types.find(type => type.id == pokemon?.type_1).name}.png`} alt={types.find(type => type.id == pokemon?.type_1).name} />
                </div> : ""}

                {pokemon?.type_2 ? <div className="pokemon__type">
                    <img src={`/types/${types.find(type => type.id == pokemon?.type_2).name}.png`} alt={types.find(type => type.id == pokemon?.type_2).name} />
                </div> : ""}

                {(!pokemon?.type_1 && !pokemon?.type_2) ? <div className="pokemon__type">
                    <img src="/types/Unknow.png" alt="" />
                </div> : "" }
            </div>
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
