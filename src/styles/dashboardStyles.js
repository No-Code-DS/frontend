import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	  topPanel: {
			backgroundColor: "white", 
			padding: "10px",
			paddingLeft: "40px"
		},
    stack: {
			backgroundColor: 'white',
			height: "100vh",
    },
    sideBar: {
			borderRight: "1px solid",
			padding: "0px"
    },
    listItem: {
			borderBottom: "1px solid"
    },
    board: {
        // padding: "auto",
    },
    modelsContainer: {
			padding: "60px", 
			backgroundColor: "#eee"
    },
		model: {
			height: "200px",
			width: "400px",
			borderRadius: "5px",
			boxShadow: "5px 7px 18px #888888",
			padding: "20px", 
			backgroundColor: "white"
		}
})

export default useStyles;