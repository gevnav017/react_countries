import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { DialogContentText } from '@mui/material';


const CountryModal = ({ open, setOpen, favCountry }) => {

    return (
        <>
            <Dialog open={open} onClose={() => {setOpen(false)}}>
                <DialogTitle>Favorite Country Details</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{mb:1}}>
                        Capital: {favCountry.capital ? favCountry.capital[0] : 'Capital does not exist'}
                    </DialogContentText>
                    <DialogContentText sx={{mb:1}}>
                        Region: {favCountry.region}
                    </DialogContentText>
                    <DialogContentText>
                        Coat of Arms:
                        <div style={{ marginTop: '10px'}}>
                            <img src={favCountry.coatOfArms.png} alt='coat of arms' style={{width:'200px'}} />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpen(false)}}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CountryModal