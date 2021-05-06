import { makeStyles } from "@material-ui/core";

export const getModalStyle = () => {
    const top = 50;
    const left = 50;
    const wi = 50;
    return {
        width: `${wi}`,
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};
export const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
