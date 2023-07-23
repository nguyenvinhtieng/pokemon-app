import { useEffect, useRef, useState } from 'react'
import PokemonList from '@/components/PokemonList'
import axios from 'axios'
import { AiOutlineArrowDown, AiOutlineArrowUp, AiFillQuestionCircle } from 'react-icons/ai'
import { BsArrowLeftRight } from 'react-icons/bs'
import ToolTip from '@/components/ToolTip'
import Skeleton from '@/components/Skeleton'
import PokemonItemSkeleton from '@/components/PokemonItemSkeleton'
import HeadMeta from '@/components/HeadMeta'

const API_URL = "https://api.eien-development.com/api/pokemon-api/pokemons/"
// const API_URL = "https://api.eien-development.com/api/pokemon-api/pokemons?filter[legendary]=1"
const API_POKEMON_TYPE = "https://api.eien-development.com/api/pokemon-api/types/"
const BASE_URL = "https://api.eien-development.com/api/pokemon-api/pokemons"
const sortTypes = ["hp", "attack", "defense", "sp_atk", "sp_def", "speed", "number"]

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const [filterCondition, setFilterCondition] = useState({
    name: '',
    legendary: '',
    type: '',
    min_total: '', // 180->770
    max_total: '',
    min_speed: '', // 5->180
    max_speed: '', 
    min_hp: '',
    max_hp: '',
    min_defense: '',
    max_defense: '',
    min_attack: '',
    max_attack: '',
    // sort: '', // created_at || updated_at
  })
  const [sortCondition, setSortCondition] = useState({
    hp: "no-sort", // increase, decrease, no-sort
    attack: "no-sort",
    defense: "no-sort",
    sp_atk: "no-sort",
    sp_def: "no-sort",
    speed: "no-sort",
    number: "no-sort",
  })
  const inputSearchRef = useRef(null)
  const selectSearchRef = useRef(null)

  const fetchPokemonData = async (url = API_URL) => {
    setIsFetching(true)
    const res = await fetch(url)
    const data = await res.json()
    setPokemons(data.data)
    setIsFetching(false)
  }

  const fetchPokemonByCondition = async () => {
    const filterConditionArray = []
    for(const key in filterCondition) {
      if(filterCondition[key] !== '') {
        filterConditionArray.push(`filter[${key}]=${filterCondition[key]}`)
      }
    }
    const queryString = `${BASE_URL}?${filterConditionArray.join('&')}`
    fetchPokemonData(queryString)
  }

  useEffect(() => {
    fetchPokemonByCondition()
  }, [filterCondition])

  useEffect(() => {
    axios.get(API_POKEMON_TYPE)
      .then((res) => {
        if(res?.data?.data?.length > 0) {
          setTypes(res.data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    
  }, [])

  const handleChooseType = (typeId) => {
    if(isFetching) return
    setFilterCondition({
      ...filterCondition,
      type: typeId
    })
    fetchPokemonByCondition()
  }

  useEffect(() => {
    let currentPokemons = [...pokemons]
    for(const key in sortCondition) {
      if(sortCondition[key] !== "no-sort") {
        currentPokemons.sort((a, b) => {
          if(sortCondition[key] === "increase") {
            return a[key] - b[key]
          } else if(sortCondition[key] === "decrease") {
            return b[key] - a[key]
          }
        }
        )
      }
    }
    setPokemons(currentPokemons)
  }, [sortCondition])

  const handleChangeSortProperty = (type) => {
    if(isFetching) return
    if(sortCondition[type] === "no-sort") {
      setSortCondition({
        ...sortCondition,
        [type]: "increase"
      })
    } else if(sortCondition[type] === "increase") {
      setSortCondition({
        ...sortCondition,
        [type]: "decrease"
      })
    } else if (sortCondition[type] === "decrease") {
      setSortCondition({
        ...sortCondition,
        [type]: "no-sort"
      })
    }
  }

  const handleSearch = () => {
    if(isFetching) return
    let pokemonName = inputSearchRef.current.value
    let pokemonLegendary = selectSearchRef.current.value
    let objSearch = {}
    if(pokemonLegendary != "-1") {
      objSearch.legendary = pokemonLegendary
    }else {
      objSearch.legendary = ""
    }
    if(pokemonName !== "") {
      objSearch.name = pokemonName
    }else {
      objSearch.name = ""
    }
    if(Object.keys(objSearch).length !== 0) {
      setFilterCondition(prev => {
        return {
          ...prev,
          ...objSearch
        }
      })
    }
  }

  return (
    <>
      <HeadMeta />
      <div className='container'>
        <div className='inner'>
          <h1 className="c-ttl-01">
            Explore your pokemons
          </h1>
          <div className="pokemon-search">
            <input ref={inputSearchRef} type="text" placeholder="Search your pokemon" className="pokemon-search__input c-input-01"/>
            <select className='c-select-01' ref={selectSearchRef}>
              <option value="-1">All Pokemon</option>
              <option value="1">Legendary Pokemon</option>
              <option value="0">Not Legendary Pokemon</option>
            </select>
            <button className="pokemon-search__btn c-btn-02" onClick={()=>handleSearch()}>Search</button>
          </div>

          <div className='c-flex'>
            <h3 className='c-ttl-03'>Sort your pokemon</h3>
            <ToolTip>
              <p className='pokemon-intro'>
                <span>Increase<AiOutlineArrowUp /></span> 
                <span>Decrease<AiOutlineArrowDown /></span> 
                <span>No sort<BsArrowLeftRight /></span> 
              </p>
            </ToolTip>
          </div>
          
          <div className="pokemon-filter">
            {sortTypes.map((type) => {
              return <div className={`pokemon-filter__item ${sortCondition[type]}`} key={type} onClick={()=>handleChangeSortProperty(type)}>
                        <span className='pokemon-filter__item--txt'>{type}</span>
                        <span className='pokemon-filter__item--type'>
                          {sortCondition[type] === "increase" && <AiOutlineArrowUp />}
                          {sortCondition[type] === "decrease" && <AiOutlineArrowDown />}
                          {sortCondition[type] === "no-sort" && <BsArrowLeftRight />}
                        </span>
                      </div>
            })}
          </div>

          <ul className="pokemon-types">
            {types?.length > 0 && types.map((type) => {
              return <li className={`pokemon-type ${filterCondition.type == type.id ? "is-active" : ""}`} key={type.id} onClick={() => handleChooseType(type.id)}>
                <span className="pokemon-type__icon">
                  <img src={`/types/${type.name}.png`} alt={type.name}/>
                </span>
                <span>{type.name}</span>
              </li>
            })}
            {types?.length == 0 && new Array(10).fill(0).map((_, index) => {
              return <li className="pokemon-type" key={index}><Skeleton width="100%" height="40px" circle="3px"></Skeleton></li>
            })}
          </ul>


          {isFetching && <div className='p-list'><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/><PokemonItemSkeleton/></div>}
          {!isFetching && pokemons?.length > 0 && <PokemonList pokemons={pokemons} types={types}/>}
          {!isFetching 
          && pokemons?.length === 0 
          && <p className='c-center-txt'>
            Not found any pokemon with <br/>
            {filterCondition.name !== '' && <span>Name: <span className='u-fw-b'>{filterCondition.name}</span><br/></span>}
            {filterCondition.legendary !== '' && <span>Legendary: <span className='u-fw-b'>{filterCondition.legendary == 1 ? "Legendary" : "Not Legendary"}</span><br/></span>}
            {filterCondition.type !== '' && <span>Type: <span className='u-fw-b'>{types.find((type) => type.id == filterCondition.type)?.name}</span><br/></span>}
              
          </p>}
          
        </div>
      </div>
    </>
  )
}


