import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";

export default makeStyles({
    paper: {
        display: "flex",
        flexDirection:"column",
        borderRadius: "10px",
         alignItems:"center",
        padding: "10px",
        margin:"20px"
    },
    avatar: {
        margin:"10px"
    }
})