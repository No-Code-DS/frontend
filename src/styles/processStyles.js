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
        margin: "0",
        height: "20px",
        width: "20px",
        // position: "absolute"
    }),
    table: css({
        // minWidth: 650,
        backgroundColor: "grey"
    }),
    cleanWindowContainer: css({
        height: "80%",
        // width: "70%",
    })
};

export default classes;