import React from "react";

import { userContext } from "./user.context"
const axios = require('axios').default;

axios.defaults.baseURL = 'http://api.wakiapp.com/api/v1';

export default function UserProvider({ children }) {
    const [user, changeUser] = React.useState(null);

    function setUser(newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
        changeUser(newUser);
    }

    React.useEffect(() => {
        console.log("user", user)
        // we should mine user from local storage
        if (user) {
            if ('token' in user) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            }
        }
        else {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
                setUser(savedUser)
            }

        }

    }, [user])


    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )

}
