import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { useContext, useLayoutEffect, useState } from "react";
import { getModalStyle, useStyles } from "./Common";
import { setstate } from "./context";
import { auth } from "./firebase";
import "./common.css";

function Sinein() {
    const { openSingIn, setopenSingIn, setshowoption } = useContext(setstate);
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [Passward, setPassward] = useState("");
    const [username, setusername] = useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const Sinein = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, Passward)
            .catch((erro) => alert(erro.message));
        setopenSingIn(false);
        setPassward("");
        setemail("");
        setshowoption(false);
    };
    const body2 = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                <center className="sine_up">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                        alt=""
                        className="app__header_img"
                    />

                    <Input
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <Input
                        placeholder="passward"
                        type="passward"
                        value={Passward}
                        onChange={(e) => setPassward(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        className="btn"
                        type="submit"
                        onClick={Sinein}
                    >
                        Sign In
          </Button>
                </center>
            </form>
        </div>
    );
    return (
        <div>
            <Modal open={openSingIn} onClose={() => setopenSingIn(false)}>
                {body2}
            </Modal>
        </div>
    );
}

export default Sinein;
