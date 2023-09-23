import { configureStore, createSlice } from "@reduxjs/toolkit";

export const favoriteCountriesSlice = createSlice({
    name: 'favoriteCountries',
    initialState: [],
    reducers: {
        addFavoriteCountry: (state, action) => {
            state.push(action.payload)
        },
        removeFavoriteCountry: (state, action) => {
            console.log(action.payload)
            let idx = null
            // state.forEach((country, index) => {
            //     if (1=1) {
            //     }
            // })
            state.push(action.payload)
        }
    }
})

const store = configureStore({
    reducer: {
        favoriteCountries: favoriteCountriesSlice.reducer
    }
})


export default store