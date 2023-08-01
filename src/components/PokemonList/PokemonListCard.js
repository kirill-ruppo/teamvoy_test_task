import React, { useEffect, useState } from 'react'

export default function PokemonListCard({_id, name, onClick, onScrollToTop, active }) {
    const [pokemonInfo, setPokemonInfo] = useState(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${_id}`)
      .then((res) => res.json())
      .then((info) => setPokemonInfo(info));
  }, [_id]);

  const handleClick = () => {
    onClick(_id); 
    onScrollToTop(); 
  };


  return (
    <div className={`bg-white h-60 flex flex-col items-center justify-center rounded-2xl ${active ? 'border-2 border-black' : ''}`} onClick={handleClick}>
        <div className='w-[35%]'>
        <img src={pokemonInfo?.sprites?.front_default} alt='pokemon_banner' className='w-full'></img>
        </div>
        <div>
            <h1 className='capitalize text-2xl'>{name}</h1>
        </div>
        <div className='flex'>
            {pokemonInfo?.types?.map((e) => (
                <div key={e.slot} className='w-full p-2'>
                    <h1  className='capitalize'>{e.type.name}</h1>
                </div>
            ))
            }
        </div>
    </div>
  )
}
