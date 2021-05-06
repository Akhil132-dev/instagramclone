import { Avatar, Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { Profiler, useContext, useLayoutEffect, useState } from "react";
import { getModalStyle, useStyles } from "./Common";
import { setstate } from "./context";
import { auth, db, storage } from "./firebase";
import Profile from "./Profile";
import "./common.css";

function Sineup() {
    const {
        show,
        setshow,
        user,
        setuser,
        setshow1,
        profile,
        showoption,
        setshowoption,
    } = useContext(setstate);
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [Passward, setPassward] = useState("");
    const [username, setusername] = useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const [image, setimage] = useState(null);
    const [user1, setuser1] = useState("");

    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user login

                // console.log(authUser);
                setuser(authUser);
                setuser1(authUser)
            } else {
                // if user logout
                setuser(null);
            }
        });
        return () => {
            //perfom some cleanup
            unsubscribe();
        };
    }, [user, username]);

    const Sineup = (e) => {

        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, Passward)
            .then((authUser) => {
                console.log(authUser)
                console.log(authUser.user)

                return authUser.user.updateProfile({
                    displayName: username,
                    photoURL: profile,
                });
            })
            .catch((error) => alert(error.message));
        setshow(false);
        setemail("");
        setPassward("");
        setusername("");
        setshowoption(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                <center className="sine_up">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                        alt=""
                        className="app__header_img"
                    />
                    <Avatar
                        onClick={() => setshow1(true)}
                        className="Post_avatar"
                        className="Icon"
                        src={profile}
                    />
                    <Input
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
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
                        color="primary"
                        className="btn"
                        type="submit"
                        onClick={Sineup}
                    >
                        Sign-up
          </Button>
                </center>
            </form>
        </div>
    );

    return (
        <div>
            <Modal open={show} onClose={() => setshow(false)}>
                {body}
            </Modal>
            <Profile />

        </div>
    );
}

export default Sineup;
