import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { favoriteCountriesSlice } from "./store";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Rating from '@mui/material/Rating';

const RatingModal = ({ openRating, setOpenRating, favCountry }) => {

    const favCountries = useSelector((state) => state.favoriteCountries);

    const { addFavoriteCountry } = favoriteCountriesSlice.actions

    const dispatch = useDispatch()

    const handleRating = (e) => {
        const rating = e.target.value
        const favCountryName = favCountry.name.common
        const countryIdx = favCountries.findIndex((fav) => fav.country.name.common === favCountryName)
        dispatch(addFavoriteCountry({countryIdx: countryIdx, rating: rating}))
        setOpenRating(false)
    }

    return (
        <>
            <Dialog open={openRating} onClose={() => { setOpenRating(false) }}>
                <DialogTitle>Rate Favorite Country</DialogTitle>
                <DialogContent>
                    <Rating
                        onChange={handleRating}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenRating(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RatingModal