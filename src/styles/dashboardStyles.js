import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	  topPanel: {
			backgroundColor: "white", 
			padding: "10px",
			paddingLeft: "50px",
			paddingRight: "50px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
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
			padding: "50px", 
			backgroundColor: "#eee",
			display: "flex",
			flexWrap: "wrap",
			flexDirection: "row",
			justifyContent: "space-between",
			height: "100vh",
			alignItems: "flex-start",
			alignContent: "flex-start"
    },

		model: {
			height: "240px",
			width: "480px",
			borderRadius: "5px",
			boxShadow: "5px 7px 18px #888888",
			padding: "20px", 
			backgroundColor: "white",
			// margin: "20px"
			marginBottom: "40px"
		}
})

export default useStyles;