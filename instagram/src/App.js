import React, { useState } from "react";
import "./App.css";
import { getModalStyle, useStyles } from "./Common";
import { setstate } from "./context";
import Header from "./Header";
import ImageUploade from "./ImageUploade";
import Modle from "./Modle";
import Posts from "./Posts";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Modal } from "@material-ui/core";
import Chat from "./Chat/Chat";
import Message from "./Chat/Message";
import reels from "./reals/Reel";
import Reel from "./reals/Reel";
import updateUser from "./updateUser";



function App() {

  const [user, setuser] = useState(null);
  // this is used for to set the user to the firebase
  const [show, setshow] = useState(false);
  // this is used to show  to show the sign up and login modale
  const [openSingIn, setopenSingIn] = useState(false);
  //this is uesd to opne sine in modal
  const [profileimage, setprofileimage] = useState(null);
  const [show1, setshow1] = useState(false);
  //this is used to cloase the image model after uploading profile when you will do sign in

  const [profile, setprofile] = useState("");
  //this is used to take the profileurl of the user form the firebase
  const [showoption, setshowoption] = useState(false);
  //this is used to close the sine up  modale
  const [image, setimage] = useState(false);

  // thisis used for iamge uplaod using firebase storege
  const [shwochat, setshwochat] = useState(false);
  const [shworeels, setshworeels] = useState(false);
  const classes = useStyles();
  const username = user?.displayName;
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {user?.displayName ? (
        <ImageUploade username={user?.displayName} dbname="posts" />
      ) : (
        <h3> Sorry you need to login to upload</h3>
      )}
    </div>
  );
  return (
    <div className="app">
      <setstate.Provider
        value={{
          setimage,
          show,
          setshow,
          user,
          setuser,
          openSingIn,
          setopenSingIn,
          profileimage,
          setprofileimage,
          show1,
          setshow1,
          profile,
          setprofile,
          showoption,
          setshowoption,
          username,
          shwochat, setshwochat, shworeels, setshworeels
        }}

      >
        <Router>

          <Switch>

            <Route exact path="/">

           

              <Header />
              <Reel />
              <Message />
              <Modal open={image} onClose={() => setimage(false)}>
                {body}
              </Modal>  <Modle />
              <div className="11">
                <Posts />

              </div>
            </Route>




          </Switch>
        </Router>

      </setstate.Provider>
    </div>
  );
}

export default App;
