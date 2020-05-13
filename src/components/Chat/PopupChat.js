import React, { useState } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, Input, Button, Form } from 'reactstrap';

import "./chat.styles.scss";
import classnames from 'classnames';
import Axios from "axios";

const fakeMessages = [
    { text: 'سلام خوبی', sent: true },
    { text: 'سلام مرسی شما خوبی', sent: false },
]
const Chat = props => {
    const { url, name, avatar } = props;

    const [messages, setMessages] = React.useState(fakeMessages);
    const [dropdownOpen, setOpen] = useState(false);
    const [newMessage, setNewMessage] = React.useState('');

    const mainRef = React.useRef(null);

    const toggle = () => setOpen(!dropdownOpen);
    const handleSubmit = e => {
        e.preventDefault();
        console.log('message', newMessage)
        setNewMessage('');
    }

    const handleChange = e => {
        setNewMessage(e.target.value);
    }

    const fetchMessages = async function () {
        const res = await Axios.get(url);
        const { data } = res;

        //we should extract messages and set messages

        // setMessages()
    }
    React.useEffect(() => {
        if (dropdownOpen && url) {
            // if it is open we should fetch data
            fetchMessages();
        }
    }, [dropdownOpen])

    React.useEffect(() => {
        mainRef.current.scrollTop = mainRef.current.scrollHeight;
        // to scroll bottom every time
        
    })

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} direction="up">
            <DropdownToggle className="btn-info circle">
                <i className="fa fa-wechat fa-lg my-2"></i>
            </DropdownToggle>
            <DropdownMenu className="chat_container">
                <header>
                    <span className="m-3 cursor-pointer" onClick={toggle}>
                        <i className="fa fa-window-close fa-lg"></i>
                    </span>
                    {
                        avatar ? (
                            <img src={avatar} className="img-avatar" alt={name} />
                        ) : (
                                <img src={'../../assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            )
                    }
                    <span className="m-3">{name}</span>
                </header>
                <main ref={mainRef}>
                    {
                        messages.map(({ text, sent }) => {
                            const className = classnames('message', { 'sent': sent, 'recieved': !sent });
                            return (
                                <span className={className}>{text}</span>
                            )
                        })
                    }
                </main>
                <Form onSubmit={handleSubmit}>
                    <footer>
                        <Input type="text" placeholder="type message" onChange={handleChange} value={newMessage} />
                        <span className="bg-secondary cursor-pointer d-flex align-items-center justify-content-center" onClick={handleSubmit}><i className="fa fa-send fa-lg"></i></span>
                    </footer>
                </Form>
            </DropdownMenu>
        </ButtonDropdown>
    )
}


export default Chat;