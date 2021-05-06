import React, { useContext } from 'react'
import { useStyles } from './Common';
import { setstate } from './context';

function updateUser() {
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [Passward, setPassward] = useState("");
    const [username, setusername] = useState("");
    const [modalStyle] = React.useState(getModalStyle);

    const [user1, setuser1] = useState("");
    const [image, setimage] = useState(null);
    const {
        setshow,
        user,
        setopenSingIn,
        show1,
        setshow1,
        setprofileimage,
        profile,
        update, setupdate
    } = useContext(setstate);

    const handleUpload = () => {

    }

    return (

        <h1>hello im update user</h1>

    )
}

export default updateUser
