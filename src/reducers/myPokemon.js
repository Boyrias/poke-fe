const initialState = JSON.parse(localStorage.getItem("pokemons"));
let index = initialState.length;
function myPokemonReducer(pokemons = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "CATCH":
      index++;
      const newData = {
        id_my: index,
        real_name: payload.name,
        seq: 1,
        ...payload
      };      
      return [...pokemons, newData];

    case "TEST":
      return payload;

    case "RENAME":
      return pokemons.map((pokemon) => {
        if (pokemon.id_my === payload.id) {
          console.log("rename", payload.name);
          const seq = pokemon.seq + 1;
          return {
            ...pokemon,
            name: payload.name,
            seq: seq
          };
        } else {
          return pokemon;
        }
      });

    case "RELEASE":
      return pokemons.filter(({ id_my }) => id_my !== payload.id);

    case "DELETE_ALL":
      return [];

    default:
      return pokemons;
  }
};

export default myPokemonReducer;