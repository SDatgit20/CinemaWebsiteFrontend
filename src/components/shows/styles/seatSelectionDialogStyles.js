import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    dialogRoot: {
        overflow: "hidden",
        minHeight: "30vh",
        maxHeight: "80vh",
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
    dialogHeader: {
        fontWeight: "bold",
        paddingLeft:"2.3cm",
        padding: "10px 0px 20px 10px"
    },
    dialogContent: {
        display: "flex",
        flexDirection: "row"
    },
    moviePicture: {
        display: "flex",
        justifyContent: "center",
        minWidth: "15%"
    },
    dialogMain: {
        display: "flex",
        padding: "0px 20px 20px 0px",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: "85%",
        maxWidth: "85%"
    },
    movieMarquee: {
        fontWeight: "bold"
    },
    seatsAndAmount: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "30%"
    },
    seatsSelector: {
        maxWidth: "30%"
    },
    dialogBottom: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "20px 0px 0px 0px"
    },
    dialogButton: {
        marginLeft: "15px"
    },
    alertMessage:{
        backgroundColor: "#d9f2e5",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    }
})
);
