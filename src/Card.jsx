import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CountryModal from './Modal';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { favoriteCountriesSlice } from './store';

const CountryCard = ({ favCountry }) => {
    const [open, setOpen] = useState(false);

    const flag = favCountry.flags

    const { addFavoriteCountry } = favoriteCountriesSlice.actions

    const dispatch = useDispatch()

    return (
        <>
            <Card>
                <CardMedia
                    component="img"
                    alt="country flag"
                    height="300"
                    image={flag.png}
                    sx={{ objectFit: "fill" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {favCountry.name.common}
                    </Typography>
                    <Typography variant="body2" sx={{ mb:1 }} color="text.secondary">
                        Capital: {favCountry.capital}
                    </Typography>
                    <Typography variant="body2" sx={{ mt:1 }} color="text.secondary">
                        {flag.alt}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent:'space-between'}}>
                    <Button size="small" onClick={() => {setOpen(true)}}>More Info</Button>
                    <Button size="small" onClick={() => {dispatch(addFavoriteCountry(favCountry))}}>Add to Favorites</Button>
                </CardActions>
            </Card>

            <CountryModal open={open} setOpen={setOpen} favCountry={favCountry}></CountryModal>
        </>
    )
}

export default CountryCard