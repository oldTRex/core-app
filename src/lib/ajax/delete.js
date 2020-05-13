import { toast } from "react-toastify";
import Axios from "axios";

export const remove = async (success, failure, anyway, ...axiosProps) => {
  try {
    const { data } = await Axios.delete(...axiosProps);
    if (data.status || data.success) {
      success && success(data);
      toast.success(data.message);
    } else {
      toast.error(data.message);
      failure && failure();
    }
  } catch ({ message }) {
    toast.error(message);
    // toast.error('مشکل در ارتباط با سرور');
  } finally {
    anyway && anyway();
  }
};
