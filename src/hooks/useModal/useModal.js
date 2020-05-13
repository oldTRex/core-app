import {useState} from "react";


export const useModal = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(state => !state);

    return {
        modal, 
        setModal, 
        toggle
    }
}