import React, { useEffect, useState } from 'react';

export default function PokemonCard({_id}) {
  const [pokemonInfo, setPokemonInfo] = useState(null);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${_id}`)
      .then((res) => res.json())
      .then((info) => setPokemonInfo(info))
      .catch((error) => console.error('Error fetching data:', error));
  }, [_id]);
console.log(pokemonInfo)
  if (pokemonInfo === null) {
    return <h1 className='font-bold text-3xl'>Click on the Pokemon to get more info</h1>;
  }
  return (
    <div className='w-full bg-pikachu_yellow rounded-lg shadow-md p-4 m-0 sm:m-2'>
      <div className='w-[80%] mx-auto'>
      <img src={pokemonInfo?.sprites?.front_default} alt='pokemon_banner' className='w-full'></img>
      </div>
      <div className='text-center flex justify-center'>
        <h1 className='capitalize text-2xl font-semibold'>{pokemonInfo.species?.name}</h1>
        <h1 className='ml-2 text-2xl'>
          #{pokemonInfo.id < 10 ? `00${pokemonInfo.id}` : pokemonInfo.id < 100 ? `0${pokemonInfo.id}` : pokemonInfo.id}
        </h1>
      </div>


      <div className='w-full flex items-center justify-center mt-4'>
        <table className='w-full p-3 mx-auto text-center'>
          <tr className='border-b border-gray-200'>
            <td className='font-semibold py-2 text-left'>Type</td>
            <td>
              {pokemonInfo.types.map((pokemon_type) => (
                <h1 className='capitalize px-2 py-1 mx-1 rounded-md bg-gray-200'>{pokemon_type.type.name}</h1>
              ))}
            </td>
          </tr>

          {pokemonInfo.stats.map((pokemon_stat) => (
            <tr key={pokemon_stat.stat.name} className='border-b border-gray-200'>
              <td className='text-left font-semibold py-2 capitalize'>{pokemon_stat.stat.name}</td>
              <td>{pokemon_stat.base_stat}</td>
            </tr>
          ))}
          <tr className='border-b border-gray-200'>
            <td className='text-left font-semibold py-2'>Weight</td>
            <td>{pokemonInfo.weight}</td>
          </tr>
          <tr>
            <td className='text-left font-semibold py-2'>Total Moves</td>
            <td>{pokemonInfo.moves.length}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
