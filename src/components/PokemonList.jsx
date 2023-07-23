import React, { useEffect, useState } from 'react'
import PokemonItem from './PokemonItem'
import ModalPokemon from './ModalPokemon'

export default function PokemonList({pokemons, types}) {
    const [pokemonImages, setPokemonImages] = useState([]); 
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentPokemonId, setCurrentPokemonId] = useState(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    const handleToggleModal = (pokemon = null) => {
        setIsShowModal(!isShowModal);
    }
    const handleClickPokemonItem = ({id, top, left}) => {
        setCurrentPokemonId(id);
        setTop(top);
        setLeft(left);
        handleToggleModal();
    }

    // detech isShowModal change
    useEffect(() => {
        if (isShowModal) {
            document.body.classList.add("is-fixed");
        } else {
            document.body.classList.remove("is-fixed");
        }
    }, [isShowModal])

    const setPokemonImageToGlobal = ({pokemon_id, image}) => {
        let currentPokemonImages = [...pokemonImages];
        const index = currentPokemonImages.findIndex(pokemonImage => pokemonImage.pokemon_id === pokemon_id);
        if (index === -1) {
            currentPokemonImages.push({pokemon_id, image});
            setPokemonImages([...currentPokemonImages])
        }
    }
    
    return (
        <>
            <div className='p-list'>
                {pokemons?.length > 0 && pokemons.map(pokemon => {
                    return <PokemonItem key={pokemon.id} pokemon={pokemon} handleClick={handleClickPokemonItem} types={types} pokemonImages={pokemonImages}/>
                })}
            </div>
            <ModalPokemon  isShowModal={isShowModal} currentPokemonId={currentPokemonId} setIsShowModal={setIsShowModal} types={types} top={top} left={left} setPokemonImageToGlobal={setPokemonImageToGlobal}/>
        </>
    )
}
