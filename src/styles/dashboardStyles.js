import { css } from '@mui/system';

const classes = {
	  topPanel: css({
			backgroundColor: "white", 
			padding: "10px",
			paddingLeft: "50px",
			paddingRight: "50px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center"
		}),
    stack: css({
			backgroundColor: 'white',
			height: "100vh",
    }),
    sideBar: css({
			borderRight: "1px solid",
			padding: "0px"
    }),
    listItem: css({
			borderBottom: "1px solid"
    }),
    board: css({
        // padding: "auto",
    }),
    modelsContainer: css({
			padding: "50px", 
			backgroundColor: "#eee",
			display: "flex",
			flexWrap: "wrap",
			flexDirection: "row",
			// justifyContent: "space-between",
			height: "100vh",
			alignItems: "flex-start",
			alignContent: "flex-start"
    }),

		model: css({
			// flex: "0 0 360px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "240px",
			width: "480px",
			borderRadius: "5px",
			boxShadow: "5px 7px 18px #888888",
			padding: "20px", 
			backgroundColor: "white",
			margin: "6px",
			// marginBottom: "40px"
		})
}

export default classes;