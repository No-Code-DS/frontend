import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    stack: {
        backgroundColor: 'white',
        height: "100vh",
    },
    sideBar: {
        backgroundColor: 'white',
        width: "20%",
        height: "100vh",
        borderRight: "1px solid",
        padding: "0px"
    },
    listItem: {
        // borderTop: "1px solid",
        borderBottom: "1px solid"
    },
    board: {
        padding: "auto",
    }
})

export default useStyles;