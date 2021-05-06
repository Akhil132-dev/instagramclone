import { Button, Input, makeStyles, Modal } from '@material-ui/core'
import React, { useContext, useLayoutEffect, useState } from 'react'

import { setstate } from './context';
import { auth } from './firebase';
import './Model.css'
import Profile from './Profile';
import Sinein from './Sinein';
import Sineup from './Sineup';

function Modle() {
    const { show, setshow, user, setuser, openSingIn, setopenSingIn } = useContext(setstate);

    const [email, setemail] = useState('');
    const [Passward, setPassward] = useState('');
    const [username, setusername] = useState('');
    return (
        <div>
            <Sineup />
            <Sinein />

        </div>
    )
}

export default Modle
// export { open1 }
