import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import './Chat.css'
const Chat = forwardRef(({ username, text, user }, ref) => {

    const Isuser = user?.displayName === username;

    return (

        <div ref={ref} className={`${Isuser ? "message__user" : "chat_chat"}`} >
            <Card className={` ${Isuser ? "message__user_card" : "other_user"}`} >
                <CardContent >
                    <Typography className="chat__message" color="white" variant="p" component="h4">
                        {!Isuser && `${username}: `}{text}
                    </Typography>
                </CardContent>
            </Card>
        </ div >

    );
})

export default Chat;
