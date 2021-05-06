import { makeStyles, Modal } from '@material-ui/core';
import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { setstate } from '../context';
import CloseIcon from '@material-ui/icons/Close';
import './Message.css'
import SendIcon from "@material-ui/icons/Send";
import { Button, Input, InputLabel, IconButton } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import Chat from './Chat';
import { db } from '../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move'
export const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {

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


function Message({ text }) {
    const [input, setinput] = useState("");


    useEffect(() => {
        db.collection('messages1').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setmessage(snapshot.docs.map((doc) => ({

                data: doc.data(),
                id: doc.id,
            })));
        })
    }, []);

    const [modalStyle] = React.useState(getModalStyle); const classes = useStyles();
    const {
        user,
        username,
        shwochat, setshwochat

    } = useContext(setstate); const [message, setmessage] = useState([]);
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('messages1').add({
            message: input,
            username: user?.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        setinput("");
    };
    // console.log(message)
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <IconButton>

                <CloseIcon onClick={() => setshwochat(false)} />
            </IconButton>

            <form>
                <center className="chat">
                    <img className="image1" src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo-5.png" alt="" />
                    <h2>Welcome  {username}</h2>




                </center>
            </form>
            <div className="chats">
                <FlipMove>
                    {
                        message.map(({ data, id }) => (


                            <Chat key={id} username={data.username} text={data.message} user={user} />


                        ))
                    }
                </FlipMove>
            </div>


            <form action="" className="chat__form">

                <FormControl className="input">
                    <div className="my_input"><InputLabel htmlFor="my-input">Type Message...</InputLabel>
                        <Input className="main_mesg"
                            type="text"
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                        />  </div><IconButton
                            className="chat__iconBuuton"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disabled={!input}
                            onClick={sendMessage}
                        >
                        <SendIcon />
                    </IconButton>




                </FormControl>
            </form>
        </div >
    );
    return (
        <div>
            <Modal open={shwochat} onClose={() => setshwochat(false)}>
                {body}
            </Modal>

        </div>
    )
}

export default Message
