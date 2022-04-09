
import{ makeStyles} from "@mui/styles";



export default makeStyles(() => {
  return {
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
    image: {
      maxWidth: "50px",
      maxHeight: "58px",
      marginLeft: '15px',
    },
    
    
  }
});