import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { Modal } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button, Icon, IconButton } from "@material-ui/core";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import { setstate } from "./context";
import { db } from "./firebase";
import firebase from "firebase";
import { getModalStyle, useStyles } from "./Common";
function Post({ imageurl, username, caption, userimage, postid }) {
    const {

        user,

    } = useContext(setstate);
    const [comments, setcomments] = useState([]);
    const [comment, setcomment] = useState("");
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [showcomment, setshowcomment] = useState(false);
    const [user1, setuser1] = useState([]);
    useEffect(() => {
        let unsubscribe;
        if (postid) {
            unsubscribe = db
                .collection("posts")
                .doc(postid)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setcomments(snapshot.docs.map((doc) =>

                        doc.data()
                    ));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postid]);


    const postcomment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postid).collection("comments").add({
            text: comment,
            username: user?.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setshowcomment(false);
        setcomment("");
    };
    const body1 = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                {user ? (
                    <center className="uploadimage">
                        <form className="Post_test">
                            <input
                                type="text"
                                className="post__input"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setcomment(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                className="post__button"
                                disabled={!comment}
                                type="submit"
                                onClick={postcomment}
                            >
                                Post
              </Button>
                        </form>
                    </center>
                ) : (
                    <h4>You need to create an account for commenting</h4>
                )}
            </form>
        </div>
    );
    return (
        <div className="Post">
            <div className="Post__header">
                <div className="Post_header__icon">
                    <Avatar className="Post_avatar" alt={username} src={userimage} />
                    <h4>{username}</h4>
                </div>
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>

            <img className="Post__img" src={imageurl} alt="" />
            <div className="Bottom_io">
                <div>
                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton>
                        <ChatBubbleOutlineSharpIcon onClick={() => setshowcomment(true)} />
                    </IconButton>
                    <IconButton>
                        <img
                            src="https://cdn0.iconfinder.com/data/icons/instagram-32/512/Chat_Message_DM-512.png"
                            alt=""
                            className="message_icon"
                        />
                    </IconButton>
                </div>
                <IconButton>
                    <TurnedInNotOutlinedIcon />
                </IconButton>
            </div>
            <div>
                <Modal open={showcomment} onClose={() => setshowcomment(false)}>
                    {body1}
                </Modal>
            </div>
            <h4 className="Post_test">
                {" "}
                <strong>{username}</strong>
                {caption}
            </h4>

            <div className="postcomments">
                {
                    (
                        comments.map(({ username, text }) => (
                            <p>
                                <strong>{username}</strong>
                                {text}
                            </p>
                        )))
                }
            </div>
        </div>
    );
}

export default Post;
