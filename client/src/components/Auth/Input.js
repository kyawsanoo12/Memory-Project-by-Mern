import { Grid, TextField,InputAdornment } from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ name, half, label, type, handleShowPassword, handleChange }) => {
    return (
        <Grid xs={12} sm={half ? 6 : 12} item>
            <TextField
                name={name}
                label={label}
                type={type}
                fullWidth
                onChange={handleChange}
                required
                InputProps={name === "password" ? {
                    endAdornment:(
                        < InputAdornment position="end" sx={{cursor:"pointer"}} onClick={ handleShowPassword } >
                        { type === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />
                }
                        </InputAdornment>
                        
                    )                
                }:null}
            />
            </Grid>
    )
};

export default Input;