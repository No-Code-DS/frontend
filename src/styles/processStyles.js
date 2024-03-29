import { css } from '@mui/system';

const classes = {
    processBox: css({
        // border: "1px solid",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    }),
    cancelButton: css({
        color: "red",
        border: "1px solid",
        padding: "0px",
        height: "20px",
        width: "20px",
        position: "absolute",
        bottom: -30,
    }),
    table: css({
        // minWidth: 650,
        backgroundColor: "grey"
    }),
    cleanDialogContainer: css({
        width: "80%",
        margin: "auto"
    }),
    cleanWindowContainer: css({
        minHeight: "80%",
        // backgroundColor: "grey"
        // width: "70%",
    }),
    cleanFunctionsContainer: css({
        marginTop: "50px",
    }),
    chosenColumn: css({
        width: "50px",
        height: "40px",
    }),
    deploymentDialogContainer: css({
        width: "50%",
        // height: "1000px",
        margin: "auto",
    }),
    deploymentWindowContainer: css({
        margin: "auto",
        height: "80%",
        width: "80%",
    }),
    deploymentWindow: css ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    })
};

export default classes;