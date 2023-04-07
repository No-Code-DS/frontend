import { css } from '@mui/system';

const classes = {
    mainContainer: css({
        minHeight: "calc(100vh - 200px)",
        marginTop: "20px",
        marginBottom: "20px",
        // border: "1px solid",
    }),
    container: css({
        padding: "40px 10px 40px",
        backgroundColor: "#243782b0",
        opacity: "86%",
        width: "55%",
        margin: "auto",
        borderRadius: "20px"
    }),
    welcome: css({
        padding: "20px 10px 20px",
    }),
    icon: css({
        marginRight: '20px',
    }),
    buttons: css({
        marginTop: "40px",
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
        padding: "20px 10px 20px",
        display: "flex",
        flexDirection: "column"
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