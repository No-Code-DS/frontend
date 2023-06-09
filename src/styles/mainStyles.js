import { css } from '@mui/system';

const classes = {
    mainContainer: css({
        minHeight: "calc(100vh - 200px)",
        width: "80%",
        margin: "auto",
    }),
    container: css({
        height: "80vh",
        // border: "1px solid green",
    }),
    welcomeWrapper: css({
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }),
    textContainer: css({
        width: "50%"
    }),
    welcomeTextTop: css({
        fontWeight: "400",
        fontSize:"4em"
    }),
    welcomeTextBottom: css({
        width: "60%",
        fontSize:"1.3em",
        color: "#808080"
    }),
    buttons: css({
        marginTop: "40px",
    }),
    card: css({
        height: "100%",
        display: "flex",
        flexDirection: "column"
    }),
    cardMedia: css({
        paddingTop: "56.25%"
    }),
    cardContent: css({
        flexGrow: 1
    }),
    tutorial: css({
        // width: "100%",
        padding: "40px",
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: "10px",
        boxShadow: "0 5px 5px 0 rgba(56, 154, 244, 0.15)",
        backgroundColor: "#fff"
    }),
    featureBox: css({
        backgroundColor: "#fff",
        width: "20%",
        padding: "60px 40px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 3px 5px 0 rgba(56, 154, 244, 0.15)",
    }),
    featureBoxTitle: css({
        margin: "50px 0 20px 0",
        color: "#389AF4",
        fontWeight: "medium",
    }),
    footer: css({
        // border: "1px solid",
    }),
    optionLinks: css({
        textDecoration: "none",
        '&:hover': {
            borderBottom: "1px solid",
            borderBottomColor: "#363891",
        }
    }),
};

export default classes;