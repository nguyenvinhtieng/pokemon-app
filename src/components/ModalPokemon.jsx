import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalPokemonSkeleton from './ModalPokemonSkeleton';

const API_IMG = "https://api.eien-development.com/api/pokemon-api/pokemons/:id/sprite"
const API_DATA ="https://api.eien-development.com/api/pokemon-api/pokemons/:id"

export default function ModalPokemon({isShowModal, setIsShowModal, currentPokemonId, types, top, left}) {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonImage, setPokemonImage] = useState("/images/ball.png");
  const [isFetchingPokemon, setIsFetchingPokemon] = useState(false);
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const [isHorizontalMobile, setIsHorizontalMobile] = useState(false);

  useEffect(() => {
    if (currentPokemonId) {
      setIsFetchingPokemon(true)
      setIsFetchingImage(true)
      fetch(API_IMG.replace(":id", currentPokemonId))
        .then(response => {
          return response.blob();
        })
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          setPokemonImage(imageUrl);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsFetchingImage(false);
        })

      axios.get(API_DATA.replace(":id", currentPokemonId))
        .then(res => {
          setPokemon(res.data.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsFetchingPokemon(false);
        })
      
    }
  }, [currentPokemonId])

  useEffect(() => {
    const eventResize = () => {
      const height = window.innerHeight;
      if(height < 520 && !isHorizontalMobile) {
        setIsHorizontalMobile(_ => true);
      } else if(height >= 520 && isHorizontalMobile) {
        setIsHorizontalMobile(_ => false);
      }
    }
    window.addEventListener("resize", eventResize);
    return () => {
        window.removeEventListener("resize", eventResize);
    };
  }, [isHorizontalMobile])

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsShowModal(false);
  }
  
  return (
    <>
    {/* If height < 520 add class to  */}
      <div className={`modal modal-main ${isShowModal ? "is-active" : ""} ${isHorizontalMobile ? "mobile" : ""}`}>
        <span className="modal__overlay" onClick={handleCloseModal}></span>
          {isFetchingPokemon && <div className="modal__container"><ModalPokemonSkeleton /></div>}

          <div className={`modal__container ${pokemon?.legendary == 1 ? "legendary large" : ""} ${isFetchingPokemon ? "is-loading" : ""}`} style={{"--x": `${top}px`, "--y": `${left}px`}}>
            <div className="modal__inner pokemon">
              <div className="modal__col">
                <div className='pokemon__img large pokemon__img-anim'>
                    <img src={pokemonImage} />
                </div>
                <div className='pokemon__id'>
                    <span>#{pokemon?.number ||"000"}</span>
                </div>
                <div className='pokemon__name u-mb-20'>
                    {pokemon?.name || "Pokemon Name"}
                </div>
                {pokemon?.legendary == 1 && <p className='pokemon__legendary'>Legendary Pokemon</p>}
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
              </div>
              <div className="modal__col">
                <div className="pokemon__info">
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>HP</span>
                        <span className='pokemon__bar hp' style={{'--width': `${Math.round(pokemon?.hp / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.hp}>{pokemon?.hp}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>Attack</span>
                        <span className='pokemon__bar attack' style={{'--width': `${Math.round(pokemon?.attack / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.attack}>{pokemon?.attack}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>Defence</span>
                        <span className='pokemon__bar defence' style={{'--width': `${Math.round(pokemon?.defense / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.defense}>{pokemon?.defense}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>sp_atk</span>
                        <span className='pokemon__bar sp_atk' style={{'--width': `${Math.round(pokemon?.sp_atk / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.sp_atk}>{pokemon?.sp_atk}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>sp_def</span>
                        <span className='pokemon__bar sp_def' style={{'--width': `${Math.round(pokemon?.sp_def / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.sp_def}>{pokemon?.sp_def}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>Speed</span>
                        <span className='pokemon__bar speed' style={{'--width': `${Math.round(pokemon?.speed / 200 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.speed}>{pokemon?.speed}</span>
                        </span>
                    </div>
                    <div className="pokemon__data">
                        <span className='pokemon__txt'>Total</span>
                        <span className='pokemon__bar total' style={{'--width': `${Math.round(pokemon?.total / 1000 * 100)}%`}}>
                            <span className='pokemon__bar--value' data-value={pokemon?.total}>{pokemon?.total}</span>
                        </span>
                    </div>
                </div>

                <span className="modal__close" onClick={handleCloseModal}>
                  <a className="c-btn-01" href="#">
                    <span className="top-key"></span>
                    <span className="text">Close</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                  </a>
                </span>
              </div>
            </div> 
          </div>

          {!isFetchingPokemon && !pokemon && <div className="modal__container">Not found Pokemon</div>}
      </div>
    </>
  )
}
