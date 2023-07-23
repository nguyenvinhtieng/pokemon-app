import React, { useEffect, useState } from 'react'
import PokemonItem from './PokemonItem'
import ModalPokemon from './ModalPokemon'
import PokemonItemSkeleton from './PokemonItemSkeleton';

export default function PokemonList({pokemons, types}) {

    const [isShowModal, setIsShowModal] = useState(false);
    const [currentPokemonId, setCurrentPokemonId] = useState(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const handleToggleModal = (pokemon = null) => {
        setIsShowModal(!isShowModal);
    }
    const handleClickPokemonItem = ({id, top, left}) => {
        // console.log("TOP")
        setCurrentPokemonId(id);
        setTop(top);
        setLeft(left);
        handleToggleModal();
    }
    
    return (
        <>
            <div className='p-list'>
                {pokemons?.length > 0 && pokemons.map(pokemon => {
                    return <PokemonItem key={pokemon.id} pokemon={pokemon} handleClick={handleClickPokemonItem} types={types}/>
                })}
            </div>
            <ModalPokemon isShowModal={isShowModal} currentPokemonId={currentPokemonId} setIsShowModal={setIsShowModal} types={types} top={top} left={left}/>
        </>
    )
}
