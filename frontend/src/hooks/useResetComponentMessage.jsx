//
import { resetMessage } from "../services/slices/photoSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 4000);
  };
};
