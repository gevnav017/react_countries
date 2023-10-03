import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CountryModal from "./Modal";
import RatingModal from "./RatingModal";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert, Rating } from "@mui/material";
import { favoriteCountriesSlice } from "./store";

const CountryCard = ({ favCountry }) => {
  const [open, setOpen] = useState(false);
  const [openRating, setOpenRating] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const flag = favCountry.flags;

  const { addFavoriteCountry } = favoriteCountriesSlice.actions;

  const dispatch = useDispatch();

  const inFavorites = useSelector((state) => state.favoriteCountries);

  const addToFavorites = (favCountry) => {
    const countryExists =
      inFavorites.find((fav) => fav.country.name.common == favCountry.name.common) !==
      undefined;

    if (countryExists) {
      setErrorSnackbar(true);
    } else {
      setOpenRating(true)
      dispatch(addFavoriteCountry(favCountry));
      setSuccessSnackbar(true)
    }
  };

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
          <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
            Capital: {favCountry.capital}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
            {flag.alt}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            onClick={() => {
              setOpen(true);
            }}
          >
            More Info
          </Button>
          <Button
            size="small"
            onClick={() => {
              addToFavorites(favCountry);
            }}
          >
            Add to Favorites
          </Button>
        </CardActions>
      </Card>

      <CountryModal
        open={open}
        setOpen={setOpen}
        favCountry={favCountry}
      ></CountryModal>

      <RatingModal 
        openRating={openRating} 
        setOpenRating={setOpenRating} 
        favCountry={favCountry}
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbar(false)}
      >
        <Alert variant="filled" severity="success">
          Successfully added to favorites
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(false)}
      >
        <Alert variant="filled" severity="error">
          This already exists in your favorites
        </Alert>
      </Snackbar>
    </>
  );
};

export default CountryCard;
