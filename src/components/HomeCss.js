import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        display: "flex",
        background: '#141313',
        height: '100vh',
        overflow: 'scroll',
        width: '100vw',
        flexDirection: 'column',
        padding: "20px",
        justifyContent:"space-between",
    },
    heading: {
        fontSize: "1.3rem",
        height: "10%",
        paddingTop:'60px',
        color:'white',
        textAlign:"center",
        fontWeight:"bolder",
    },
    box: {
        display: 'flex',
        flexWrap: "wrap",
        flexDirection:"row",
        justifyContent: "space-between",
        color:'white',
        fontWeight:"bolder",
    },
    box1: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent:"space-around",
        alignItems: "center",
        color:'white',
        fontWeight:"bolder",
    }
})