import React, { useContext, useState } from "react";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import { Avatar, Button, Icon, IconButton, } from "@material-ui/core";
import "./Header.css";
import { Link } from "react-router-dom";
import { setstate } from "./context";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { auth, db } from "./firebase";
import { getModalStyle, useStyles } from "./Common";
import { Input, makeStyles, Modal } from "@material-ui/core";
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
function Header() {
    const classes = useStyles();
    const {
        setimage,
        setshwochat,
        setshow,
        user,
        setopenSingIn,
        showoption,
        setshowoption,
        setshworeels,
    } = useContext(setstate);
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {user ? (
                <Button
                    className="icon_buton"
                    onClick={() => {
                        auth.signOut(), setshowoption(false)

                    }}
                >
                    <IconButton>
                        <p color="redcd "> Logout</p>

                        <ExitToAppIcon variant="contained" color="secondary" />
                    </IconButton>
                </Button>
            ) : (
                <div className="login_container">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setopenSingIn(true)}
                    >
                        Sine in
          </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setshow(true)}
                    >
                        Sine up
          </Button>
                </div>
            )
            }
        </div >
    );

    return (
        <div className="header">
            <div className="app__header">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                    alt=""
                    className="app__header_img"
                />
            </div>
            <div>
                <input className="header__input" type="text" placeholder="Search " />
            </div>
            <div className="header__icon">
                {user ? (

                    <IconButton>
                        <AddAPhotoIcon onClick={() => setimage(true)} />
                    </IconButton>
                ) : (
                    ""
                )}

                {user ? (


                    <IconButton >
                        <img onClick={() => setshwochat(true)}
                            src="https://cdn0.iconfinder.com/data/icons/instagram-32/512/Chat_Message_DM-512.png"
                            alt=""
                            className="message_icon"
                        />
                    </IconButton>


                ) : (
                    ""
                )}

                {user ? (
                    <IconButton>

                        <OndemandVideoIcon onClick={() => setshworeels(true)} />
                    </IconButton>
                ) : (
                    ""
                )}

                {user ? (
                    <Avatar
                        onClick={() => setshowoption(true)}
                        className="Post_avatar"
                        className="Icon"
                        src={user?.photoURL}
                    />
                ) : (
                    <IconButton>
                        <PersonAddIcon onClick={() => setshowoption(true)} />
                    </IconButton>
                )}

                <Modal open={showoption} onClose={() => setshowoption(false)}>
                    {body}
                </Modal>

            </div>
        </div >
    );
}

export default Header;
