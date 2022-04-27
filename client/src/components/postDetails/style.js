import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    
    
    
    padding:"20px",
   
    },
    cardContent: {
        maxWidth:"700px"
   },
  postSection: {
    width:"100%",
    display: "flex",
    flexDirection:"row"
  },
  recommendedPost: {
    width: "300px",
    maxHeight: "400px",
   
  },
    title: {
        margin: "20px",
       
    },
  cardmedia: {
    width: "100%",
    
    },
  section: {
    display: "flex",
    flexDirection:"row",
  },
  imageSection: {
    marginLeft: '20px',
    
    
  },
  textcol: {
    width:"50%"
  },
  mediaCol: {
    maxHeight:"400px",
    width: "40%",
    
  },
  recommendedPosts: {
    padding:"20px",
    display:"flex"
   
  },

  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));