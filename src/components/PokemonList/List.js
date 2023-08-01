import PokemonListCard from "./PokemonListCard";
import React, { useEffect, useState } from 'react';
import PokemonCard from "./PokemonCard";

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const [activePokemon, setActivePokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const fetchPokemon = () => {
    setLoading(true); 
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`)
      .then((res) => res.json())
      .then((pokemons) => {
        setPokemonList((prevList) =>
          offset === 0 ? pokemons.results.map((pokemon, index) => ({
                ...pokemon,
                id: offset + index + 1,
              }))  : [
                ...prevList,
                ...pokemons.results.map((pokemon, index) => ({
                  ...pokemon,
                  id: offset + index + 1,
                })),
              ]
        );
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  };
  
  const handlePokemonClick = (id) => {
    setActivePokemon(id);
  };

  const handleLoadMore = () => {
    if (!loading) { 
      setOffset((prevOffset) => prevOffset + 12);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  return (
    <div className="w-full h-full flex sm:flex-row flex-col-reverse items-center sm:items-start">
      <div className="lg:w-3/5 sm:w-1/2 w-[90%]">
        <div className="p-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-4 gap-3">
          {pokemonList.length > 0 &&
            pokemonList.map((pokemon) => (
              <PokemonListCard
                key={pokemon.id}
                _id={pokemon.id}
                name={pokemon.name}
                onClick={() => handlePokemonClick(pokemon.id)}
                onScrollToTop={handleScrollToTop} 
                active={pokemon.id === activePokemon}
              />
            ))}
        </div>
        <button
          className="w-full bg-red h-14 text-black text-2xl mt-3 rounded-xl"
          onClick={handleLoadMore}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>

      <div className="md:w-[35em] sm:w-[18em] w-[90%] flex flex-col justify-center items-start p-0 sm:p-10">
        <PokemonCard _id={activePokemon} />
      </div>
    </div>
  );
}
