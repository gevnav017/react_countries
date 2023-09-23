import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import CountryCard from './Card';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';



function App() {
  const [countries, setCountries] = useState([]);
  const [favCountryIdx, setFavCountryIdx] = useState('');
  const [favCountry, setFavCountry] = useState(null);


  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = await response.json()
      setCountries(data)
    }

    getCountries()
  }, [])

  const favCountryChange = (e) => {
    setFavCountryIdx(e.target.value)
  }


  const onSubmit = (event) => {
    event.preventDefault();

    setFavCountry(countries[favCountryIdx])
  };

  const favoriteCountries = useSelector(state => state.favoriteCountries)

  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ mx:4, my:2, display:'flex', justifyContent:'space-between' }}>

        <Box sx={{width:'40%'}}>
          <form onSubmit={onSubmit} style={{display:'flex', justifyContent:'space-between', height:'100%'}}>
            <FormControl>
              <InputLabel id="countries">Countries</InputLabel>
              <Select
                labelId="countries"
                id="demo-simple-select"
                value={favCountryIdx}
                label="Age"
                onChange={favCountryChange}
                sx={{minWidth:'200px'}}
              >
                {countries.map((country, idx) => {
                  return <MenuItem value={idx} key={idx}>{country.name.common}</MenuItem>
                })}
              </Select>
            </FormControl>
            <Button sx={{height:'100%'}} type="submit" variant="outlined">Submit Favorite</Button>
          </form>
        </Box>

      </Box>

      <Box sx={{ mx:4, my:2, display:'flex', justifyContent:'space-between' }}>
        <Box sx={{width:'40%'}}>
          {favCountry ? <CountryCard favCountry={favCountry} /> : ''}

        </Box>

        <Box sx={{width:'45%', textAlign:'center'}}>
            {favoriteCountries && favoriteCountries.map((favCount, idx) => {
              return (
                <Box sx={{my:2, p:2, borderRadius:'10px', color:'white', bgcolor:'#72A2D1'}} key={idx}>
                    {favCount.name.common}

                    <img style={{marginLeft:'10px'}} src={favCount.flags.png} alt='flag' width='30' height='20' />

                    <Button sx={{float:'right', color:'white', border:'0'}} variant="outlined" onClick={() => {dispatch(removeFavoriteCountry(favCount))}}>
                      X
                    </Button>
                </Box>
              )
            })}
        </Box>

      </Box>
    </>
  );
}

export default App
