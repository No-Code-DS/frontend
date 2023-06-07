import { css } from '@mui/system';

const classes = {
    mainContainer: css({
        minHeight: "calc(100vh - 200px)",
        // marginTop: "10px",
        marginBottom: "20px",
        // border: "1px solid",
    }),
    container: css({
        maxWidth: "100%",
        maxHeight: "100%",
        // border: "1px solid green",
    }),
    welcome: css({
        // border: "1px solid red",
        // height: "50vh",
        // width: "200px",
        // padding: "20px 10px 20px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    welcomeTextTop: css({
        fontWeight: "bold",
        fontSize:"1.9em"
    }),
    welcomeTextBottom: css({
        width: "60%",
        fontSize:"1.5em",
    }),
    icon: css({
        marginRight: '20px',
    }),
    buttons: css({
        // marginTop: "40px",
    }),
    cardGrid: css({
        padding: "20px 0",
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
        width: "100%",
        padding: "20px 10px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        border: "1px solid transparent",
        borderRadius: "10px",
        backgroundColor: "#D4E4FFFF"
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