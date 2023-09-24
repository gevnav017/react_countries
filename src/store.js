import { configureStore, createSlice } from "@reduxjs/toolkit";

export const favoriteCountriesSlice = createSlice({
    name: 'favoriteCountries',
    initialState: [],
    reducers: {
        addFavoriteCountry: (state, action) => {
            state.push(action.payload)
        },
        removeFavoriteCountry: (state, action) => {
            const name = action.payload.name.common
            let idx = null
            state.forEach((country, index) => {
                if (name == country.name.common) {
                    idx = index
                }
            })
            state.splice(idx, 1)
        }
    }
})

const store = configureStore({
    reducer: {
        favoriteCountries: favoriteCountriesSlice.reducer
    }
})


export default store

window.store = store