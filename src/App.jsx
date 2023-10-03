import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import CountryCard from "./Card";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import { favoriteCountriesSlice } from "./store";
import { Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";


function App() {
  const [countries, setCountries] = useState([]);
  const [favCountryIdx, setFavCountryIdx] = useState("");
  const [favCountry, setFavCountry] = useState(null);
  const [deleteFavSnackbar, setDeleteFavSnackbar] = useState(false)

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    };

    getCountries();
  }, []);

  const favCountryChange = (e) => {
    setFavCountryIdx(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setFavCountry(countries[favCountryIdx]);
  };

  const { removeFavoriteCountry } = favoriteCountriesSlice.actions;
  const { addFavoriteCountry } = favoriteCountriesSlice.actions;

  const favoriteCountries = useSelector((state) => state.favoriteCountries);
  const favCount = favoriteCountries.length

  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{ mx: 4, my: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "40%" }}>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <FormControl>
              <InputLabel id="countries">Countries</InputLabel>
              <Select
                labelId="countries"
                id="demo-simple-select"
                value={favCountryIdx}
                label="Age"
                onChange={favCountryChange}
                sx={{ minWidth: "200px" }}
              >
                {countries.map((country, idx) => {
                  return (
                    <MenuItem value={idx} key={idx}>
                      {country.name.common}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button sx={{ height: "100%" }} type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            width: "45%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {favoriteCountries.length > 0 ? (
            <Typography>Favorite Countries ({favCount})</Typography>
          ) : (
            ""
          )}
        </Box>
      </Box>

      <Box
        sx={{ mx: 4, my: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "40%" }}>
          {favCountry ? <CountryCard favCountry={favCountry} /> : ""}
        </Box>

        <Box sx={{ width: "45%" }}>
          {favoriteCountries &&
            favoriteCountries.map((favCount, idx) => {
              return (
                <Box className="favorites-card"
                  sx={{
                    my: 2,
                    p: 2,
                    borderRadius: "10px",
                    color: "white",
                    bgcolor: "#72A2D1",
                    position: "relative",
                    transition: "all .4s"
                  }}
                  key={idx}
                >
                  {favCount.country.name.common}

                  <img
                    style={{ marginLeft: "10px" }}
                    src={favCount.country.flags.png}
                    alt="flag"
                    width="30"
                    height="20"
                  />

                  <Rating
                    sx={{ 
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)"
                    }}
                    name="simple-controlled"
                    value={parseInt(favCount.rating)}
                    onChange={(e) => {
                      const rating = e.target.value
                      const countryIdx = favoriteCountries.findIndex((fav) => fav.country.name.common === favCount.country.name.common)
                      dispatch(addFavoriteCountry({countryIdx: countryIdx, rating: rating}))
                    }}
                  />

                  <Button
                    sx={{
                      color: "white",
                      position: "absolute",
                      right: "2%",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      dispatch(removeFavoriteCountry(favCount))
                      setDeleteFavSnackbar(true);
                    }}
                  >
                    X
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={deleteFavSnackbar}
        autoHideDuration={6000}
        onClose={() => setDeleteFavSnackbar(false)}
      >
        <Alert variant="filled" severity="success">
          Successfully deleted from favorites
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
