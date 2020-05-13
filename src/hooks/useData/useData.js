import { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const useData = function (url, normalize = (args) => args, initialData = null) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get(url)
            .then(({ data }) => {
                console.log('data from use Data hook', data);
                if (data) {
                    const normalized = normalize(data);
                    setData(normalized)
                }
            }).catch(() => {
                toast.error('مشکل در ارتباط با سرور');
                setData(initialData)
            }).finally(() => setLoading(false))
    }, [url])

    return [data, setData, loading, setLoading];

}
