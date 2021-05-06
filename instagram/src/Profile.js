import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { useContext, useLayoutEffect, useState } from "react";
import { getModalStyle, useStyles } from "./Common";
import { setstate } from "./context";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { auth, storage } from "./firebase";
import "./common.css";
function Profile() {
    const {
        setshow,
        user,
        setopenSingIn,
        show1,
        setshow1,
        profile,
        setprofile,
    } = useContext(setstate);
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [Passward, setPassward] = useState("");
    const [username, setusername] = useState("");
    const [modalStyle] = React.useState(getModalStyle);
    const [image, setimage] = useState(null);
    const [progress1, setprogress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            //get the first file that you selected
            setimage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (image?.name) {
            console.log("open");
            const uploadtask = storage.ref(`Profile/${image?.name}`).put(image);
            uploadtask.on(
                "state_changed",
                (spanshot) => {
                    //Progress function
                    const progress = Math.round(
                        (spanshot.bytesTransferred / spanshot.totalBytes) * 100
                    );
                    setprogress(progress);
                },
                (error) => {
                    //Error function
                    console.log(error);
                    alert.apply(error.message);
                },
                () => {
                    //complete function
                    storage
                        .ref("Profile")
                        .child(image?.name)
                        .getDownloadURL()
                        .then((url) => {
                            //post the iamge

                            setprofile(url);
                            setprogress(0);
                            setshow1(false);
                            setimage(null);
                        });
                }
            );
        } else {
            alert("please select a image for your profile");
        }
    };
    const body1 = (
        <div style={modalStyle} className={classes.paper}>
            <form>
                <center className="uploadimage">
                    <div className="image">
                        <progress value={progress1} max="100" />
                        <input type="file" onChange={handleChange} />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                            onClick={handleUpload}
                        >
                            Upload
            </Button>
                    </div>
                </center>
            </form>
        </div>
    );
    return (
        <div>
            <Modal open={show1} onClose={() => setshow1(false)}>
                {body1}
            </Modal>
        </div>
    );
}

export default Profile;
