import React, { useEffect, useState } from 'react'
import Card from './Card';
import pokebola from '../assets/pokebola.png';

const layout = () => {
  const [count, setCount] = useState(20);
  const [pokemonList, setPokemonList] = useState([]);
  const [filtredList, setFiltredList] = useState([]);
  const [pokemon, setPokemon] = useState("");

  const getData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=0`);
    const data = await response.json();
    if (response.ok) {
      setPokemonList(data.results);
      //console.log(data.results);
    }
    else {
      console.error('Error fetching data:', response.statusText);
    }

  }

  const searchPokemon = () => {
    const filtered = pokemonList.filter(poke => poke.name.toLowerCase().includes(pokemon.toLowerCase()));
    setFiltredList(filtered);
  }

  useEffect(() => {
    getData();
    searchPokemon();
  }, [count, pokemon])

  const handleClick = () => {
    setCount(count + 10);
  }
  return (
    <div className='min-h-screen h-full w-full flex flex-col items-center bg-[#ffffff]'>
      <div className="bg-[#6f6f6f] h-20 sm:w-full w-full flex items-center justify-center shadow-xl/10">
        <img src={pokebola} alt="" className='w-15' />
        <h1 className='lg:text-5xl text-white ml-3'>Pokédex</h1>
      </div>

      <div className='flex flex-row justify-center items-center h-20'>
        <div className='border-t-2 border-b-2 border-l-2 border-[#b6b0bd] bg-[#ffffff] rounded-l-md h-8 p-1'>
        <i className="bi bi-search"></i>
        </div>
        
        <input className='border-2 border-[#b6b0bd] bg-[#ffffff] rounded-r-md h-8 p-2 '
          type="text"
          placeholder='Search Pokémon'
          value={pokemon}
          onChange={(e) => { setPokemon(e.target.value) }}
        />
      </div>

      <div className='w-4/5 grid  gap-4 justify-items-center'>
        {/*pokemonList.map((pokemon, index) => (
          <Card key={index} name={pokemon.name} url={pokemon.url}/>
        ))*/
          pokemon.length == '' ?
            pokemonList.map((pokemon, index) => (
              <Card key={index} name={pokemon.name} url={pokemon.url} />
            )) :
            filtredList.map((pokemon, index) => (
              <Card key={index} name={pokemon.name} url={pokemon.url} />
            ))}
      </div>
      <button className=' mb-10 mt-5 bg-[#232323] rounded-full text-white text-xl pr-5 pl-5 pt-3 pb-3 cursor-pointer hover:bg-gray-500' onClick={handleClick}>Show more</button>
    </div>
  )
}

export default layout