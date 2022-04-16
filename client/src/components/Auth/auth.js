import { Container, Grid, Paper, Typography,Avatar,Button} from "@mui/material";
import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import useStyles from "./style";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from '@mui/icons-material/Google';
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
    const initailState = { firstName: "", lastName: "", email: "", password: "", confrimPassword: "" };

    const [formData, setFormData] = useState(initailState);

    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const handleChange = (e) => {
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

     const handleSubmit = (e) => {
        e.preventDefault();
         if (isSignUp) {
             dispatch(signup(formData, history));
         } else {
             dispatch(signin(formData, history));
        }
    }
    
    const handleShowPassword = () => {
       setShowPassword((pre)=>!pre)
    }

    const GoogleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
     
        try {
            dispatch({ type: "AUTH", data: { result, token } });
              history("/")
        } catch (err) {
            console.log(err)
        }
        

    }

    const GoogleFailure = (err) => {
        console.log("UnSuccess")
        console.log(err)
    }
    
   

 const switchMode=()=>setIsSignUp((prevIsSign)=>!prevIsSign)

    return (
        <Container maxWidth="xs">
            <Paper elevation={4} className={classes.paper}>
                <Typography variant="h4"  >{isSignUp ? "Sign Up":"Sign In"}</Typography>
                <Avatar className={classes.avatar} sx={{backgroundColor:"purple"}}>
                     <LockIcon />
                </Avatar>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{padding:"10px"}}>
                    {
                        isSignUp && (
                            <>
                            <Input label="First Name" name="firstName" half handleChange={handleChange} />
                                <Input label="Last Name" name="lastName" half handleChange={handleChange} />
                                </>
                        )
                    }
                    <Input label="Email Address" name="email" handleChange={handleChange} />
                    <Input label="Password" name="password" type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} handleChange={handleChange} />
                    {isSignUp && (
                            <Input label="Confrim Password" name="confrimPassword" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange}/>
                    )
                    }
                   
                </Grid>
                <Button variant="contained" color="primary" fullWidth type="submit">
                   {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <Grid container  sx={{marginTop:"10px"}} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography color="textSecondary" sx={{fontSize:"13px"}}>OR</Typography>
                        </Grid>
                    </Grid>
                    <GoogleLogin 
                        clientId="963628411954-e9rp3oqt0dvshg9t3erk2bpq7b9ah3v8.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button variant="outlined" sx={{marginTop:"10px"}} fullWidth onClick={renderProps.onClick} startIcon={<GoogleIcon/>} >
                                    With Google
                            </Button>
                        )}
                        onSuccess={GoogleSuccess}
                        onFailure={GoogleFailure}
                    />
                    <Grid container justifyContent="flex-end" sx={{padding:"5px"}}>
                        <Grid item>
                            <Button onClick={switchMode} color="inherit">{isSignUp ? "Already have an account? Sign In" : "Do you have't account? Sign Up"}</Button>
                            </Grid>
                        </Grid>
                    </form>
            </Paper>
        </Container>
    )
}

export default Auth;