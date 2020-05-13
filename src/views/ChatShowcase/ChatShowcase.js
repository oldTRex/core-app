import React, {useState} from "react";
import Chat from "components/Chat/PopupChat";
const messages = [
    {text:'سلام خوبی', sent:true},
    {text:'سلام مرسی شما خوبی', sent:false},
]
export default () => {
    

    return (
        <div>
            <h1> chat showCase</h1>

            <Chat messages={messages} name="soltan amir" />

        </div>
    )
}