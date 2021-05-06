import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { db, storage } from "./firebase";
import firebase from "firebase";
import React, { useContext, useState } from "react";
import { setstate } from "./context";
import Profile from "./Profile";
import { useStyles } from "./Common";
function ImageUploade({ username, dbname }) {
    console.log(dbname)
    const classes = useStyles();
    const [caption, setcaption] = useState("");
    const [image1, setimage1] = useState(null);

    const [progress1, setprogress] = useState(0);
    const {
        setshow,
        setimage,
        user,
        setopenSingIn,
        show1,
        setshow1,
        setprofileimage,
        profile,
    } = useContext(setstate);
    const handleChange = (e) => {
        if (e != undefined) {
            if (e.target.files[0]) {
                //get the first file that you selected
                setimage1(e.target.files[0]);
            }
        }
    };

    const handleUpload = () => {
        if (image1?.name) {
            console.log("open");
            const uploadtask = storage.ref(`${dbname}/${image1?.name}`).put(image1);
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
                        .ref(`${dbname}`)
                        .child(image1?.name)
                        .getDownloadURL()
                        .then((url) => {
                            console.log(url)
                            //post the iamge
                            db.collection(`${dbname}`).add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageurl: url,
                                username: user?.displayName,
                                userimg: user?.photoURL,
                                imagename: image1?.name
                            });
                            setprogress(0);
                            setcaption("");
                            setimage1(null);
                            setimage(false);
                        });
                }
            );
        } else {
            alert("Please select an image to upload");
        }
    };
    return (
        <div className="image">

            <progress value={progress1} max="100" />
            <input
                type="text"
                placeholder="Enter a Caption"
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
            />
            <input className="takephoto" type="file" onChange={handleChange} />


            <Button
                onClick={handleUpload}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
            >
                Upload
      </Button>
        </div>
    );
}

export default ImageUploade;
