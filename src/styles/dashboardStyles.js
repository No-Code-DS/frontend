import { css } from '@mui/system';

const classes = {
	topPanel: css({
		backgroundColor: "white", 
		padding: "10px 5%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	}),
    stack: css({
		height: "100vh",
    }),
    sideBar: css({
		// padding: "0px",
		backgroundColor: "#fff",
    }),
    board: css({
        // padding: "auto",
    }),
    modelsContainer: css({
		width: "90%",
		padding: "50px 0",
		margin: "auto",
		display: "flex",
		flexWrap: "wrap",
		// flexDirection: "row",
		alignItems: "center",
		// alignContent: "flex-start"
		justifyContent: "space-between",
		gap: "20px",
    }),
	model: css({
		// flex: "0 0 360px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "240px",
		width: "480px",
		borderRadius: "5px",
		boxShadow: "0 2px 4px 0 rgba(56, 154, 244, 0.15)",
		padding: "20px", 
		backgroundColor: "white",
		// marginBottom: "40px"
	})
}

export default classes;