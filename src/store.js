import { configureStore, createSlice } from "@reduxjs/toolkit";

export const favoriteCountriesSlice = createSlice({
    name: 'favoriteCountries',
    initialState: [],
    reducers: {
        addFavoriteCountry: (state, action) => {
            const actionObj = action.payload
            if ("rating" in actionObj) {
                const rating = actionObj.rating
                const countryIdx = actionObj.countryIdx
                state[countryIdx].rating = rating
            }
            else {
                state.push({
                    country: actionObj
                })
            }
        },
        removeFavoriteCountry: (state, action) => {
            const name = action.payload.country.name.common
            let idx = null
            state.forEach((countryObj, index) => {
                if (name == countryObj.country.name.common) {
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