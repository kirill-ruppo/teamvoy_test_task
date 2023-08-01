import PokemonListCard from "./PokemonListCard";
import React, { useEffect, useState } from 'react';
import PokemonCard from "./PokemonCard";

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const [activePokemon, setActivePokemon] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  const fetchPokemon = () => {
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
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handlePokemonClick = (id) => {
    setActivePokemon(id);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 12);
    fetchPokemon();
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
                {...pokemon}
                onClick={() => handlePokemonClick(pokemon.id)}
              />
            ))}
        </div>
        <button
          className="w-full bg-red h-14 text-black text-2xl mt-3 rounded-xl"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>

      <div className="md:w-[35em] sm:w-[18em] w-[90%] flex flex-col justify-center items-start p-0 sm:p-10">
        <PokemonCard _id={activePokemon} />
      </div>
    </div>
  );
}

// import PokemonListCard from "./PokemonListCard";
// import React, { useEffect, useState } from 'react';
// import PokemonCard from "./PokemonCard";

// export default function List() {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [activePokemon, setActivePokemon] = useState(null);
//   const [offset, setOffset] = useState(0);
//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState('');

//   useEffect(() => {
//     fetchPokemon();
//     fetchPokemonTypes();
//   }, []);

//   const fetchPokemon = () => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`)
//       .then((res) => res.json())
//       .then((pokemons) => {
//         setPokemonList((prevList) =>
//           offset === 0
//             ? pokemons.results.map((pokemon, index) => ({
//                 ...pokemon,
//                 id: offset + index + 1,
//               }))
//             : [...prevList, ...pokemons.results.map((pokemon, index) => ({
//                 ...pokemon,
//                 id: offset + index + 1,
//               })),
//               ]
//         );
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   };

//   const fetchPokemonTypes = () => {
//     fetch('https://pokeapi.co/api/v2/type/')
//       .then((res) => res.json())
//       .then((data) => {
//         setTypes(data.results.map((type) => type.name));
//       })
//       .catch((error) => console.error('Error fetching types:', error));
//   };

//   const handlePokemonClick = (id) => {
//     setActivePokemon(id);
//   };

//   const handleLoadMore = () => {
//     setOffset((prevOffset) => prevOffset + 12);
//     fetchPokemon();
//   };

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };
//   const handleTypes = (values) => {
//     setTypes(values);
//   };

//   const filteredPokemonList = selectedType
//     ? pokemonList.filter((pokemon) =>
//         pokemon.types.filter((type) => type.type.name === selectedType)
//       )
//     : pokemonList;

//   console.log(types)
//   return (
//     <container className="w-full h-full flex sm:flex-row flex-col-reverse items-center sm:items-start">
//       <div className="lg:w-3/5 w-1/2">
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-4 gap-3">
//           {filteredPokemonList.map((pokemon) => (
//             <PokemonListCard
//               key={pokemon.id}
//               _id={pokemon.id}
//               {...pokemon}
//               onClick={() => handlePokemonClick(pokemon.id)}
//               onValueChange={handleTypes}
//             />
//           ))}
//         </div>
//         <button
//           className="w-full bg-red h-14 text-black text-2xl mt-3 rounded-xl"
//           onClick={handleLoadMore}
//         >
//           Load More
//         </button>
//       </div>

//       <div className="sm:w-[35em] w-[20em] flex flex-col justify-center items-start p-0 sm:p-10">
//         <label htmlFor="typeSelect" className="mr-2">
//           Sort Pokémons by Type:
//         </label>
//         <select
//           id="typeSelect"
//           className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={handleTypeChange}
//           value={selectedType}
//         >
//           <option value="">All</option>
//           {types.map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>

//         <PokemonCard _id={activePokemon} />
//       </div>
//     </container>
//   );
// }

