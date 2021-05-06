
import { makeStyles, Modal } from '@material-ui/core';
import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { setstate } from '../context';
import { Button, Input, InputLabel, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import './Reels.css'
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import VideoCard from './VideoCard';

import ImageUploade from '../ImageUploade';
import { db } from '../firebase';
export const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        background: "#333",
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};
export const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Reel() {

    const white = "#fff"
    const {
        user,
        username,
        shwochat, setshwochat,
        setshworeels, shworeels

    } = useContext(setstate); const [message, setmessage] = useState([]);
    const [uploadReels, setuploadReels] = useState(false)
    const [modalStyle] = React.useState(getModalStyle); const classes = useStyles();
    const [Post1, setPost1] = useState([]);
    useEffect(() => {

        document.title = "Reels";
        db.collection("Reels")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPost1(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="reel_header">
                <IconButton>

                    <CloseIcon className="reel_text" onClick={() => setshworeels(false)} />
                </IconButton>
                <IconButton>

                    <QueuePlayNextIcon className="reel_text" onClick={() => setuploadReels(true)} />
                </IconButton>
            </div>    <div className="main_reels">

                <div className="reels__vidoe">

                    {Post1.map(({ id, post }) => (


                        <VideoCard
                            key={id}
                            username={post.username}
                            caption={post.caption}
                            imageurl={post.imageurl}
                            userimage={post.userimg}
                            imagename={post.imagename}
                            postid={id} />
                    ))}




                </div>
            </div>



        </div >
    );
    const body1 = (
        <div style={modalStyle} className={classes.paper}>

            <div className="uploade">
                <Button

                    variant="contained"
                    color="primary"

                    onClick={() => setuploadReels(false)}>close</Button>
                <ImageUploade dbname={"Reels"} />
            </div>

        </div >
    );







    return (
        <div>
            <Modal open={shworeels} onClose={() => setshworeels(false)}>
                {body}
            </Modal>
            <Modal open={uploadReels} onClose={() => setuploadReels(false)}>
                {body1}
            </Modal>






        </div>
    )
}

export default Reel;
