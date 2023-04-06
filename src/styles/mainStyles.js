import { makeStyles, StylesProvider } from '@mui/styles';

const useStyles = makeStyles({
    mainContainer: {
        minHeight: "calc(100vh - 200px)",
        marginTop: "20px",
        marginBottom: "20px",
        // border: "1px solid",
    },
    container: {
        padding: "40px 10px 40px",
        // backgroundColor: "#243782b0", 
        backgroundColor: "#243782b0",
        opacity: "86%",
        width: "55%",
        margin: "auto",
        borderRadius: "20px"
    },
    welcome: {
        padding: "20px 10px 20px",
    },
    icon: {
        marginRight: '20px',
    },
    buttons: {
        marginTop: "40px",
    },
    cardGrid: {
        padding: "20px 0",
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    },
    tutorial: {
        padding: "20px 10px 20px",
        display: "flex",
        flexDirection: "column"
    },
    footer: {
        // border: "1px solid",
    },
    optionLinks: {
        textDecoration: "none",
        '&:hover': {
            borderBottom: "1px solid",
            borderBottomColor: "#363891",
        }
    },
});

export default useStyles;