import List from "./components/PokemonList/List";
function App() {
  return (
    <div className="w-full h-full bg-green">
      <div className="w-full text-4xl text-center p-5">
        <h1>Pokedex</h1>
      </div>
      <List/>
    </div>
  );
}

export default App;
