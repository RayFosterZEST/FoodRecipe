import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: function(state,action){
    const idFood = action.payload.idFood;
    let newFavourites = [...state.favoriterecipes];
    if(newFavourites.some(function(recipe){return recipe.idFood === idFood})){
        state.favoriterecipes = newFavourites.filter(function(thisRecipe){
            return thisRecipe.idFood !== idFood;
        });       
    }else{
        newFavourites.push(action.payload);
        state.favoriterecipes = newFavourites
    }
   }
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
