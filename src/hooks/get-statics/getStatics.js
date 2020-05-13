import  { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const useGetStatics = function (url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get(url)
            .then((data) => {
                console.log('data from get stat hooks', data);
                if (data) {
                    setData(data)
                }
            }).catch(() => {
                toast.error('مشکل در ارتباط با سرور');
            }).finally(() => setLoading(false))
    }, [])

    return [data, setData, loading, setLoading];

}