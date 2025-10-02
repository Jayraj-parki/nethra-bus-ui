import { useSelector, useDispatch } from "react-redux";
import {
  selectAuth,
  selectIsAuthenticated,
  selectIsGuest,
  selectUser,
  continueAsGuest,
  signOut,
  loginWithCredentials
} from "@/store/authSlice";

export const useAuth = () => {
  const auth = useSelector(selectAuth);
  const isAuthed = useSelector(selectIsAuthenticated);
  const isGuest = useSelector(selectIsGuest);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return {
    auth,
    isAuthed,
    isGuest,
    user,
    continueAsGuest: () => dispatch(continueAsGuest()),
    signOut: () => dispatch(signOut()),
    login: (email, password) => dispatch(loginWithCredentials({ email, password }))
  };
};
