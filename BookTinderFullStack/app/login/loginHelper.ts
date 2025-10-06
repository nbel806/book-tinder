import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";

export async function validateLogin(email: string, password: string) {
  const dispatch = useDispatch();
  {
    dispatch(loginStart());
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess(data));
        return true;
      } else {
        const error = await response.text();
        dispatch(loginFailure(error));
        return false;
      }
    } catch (error) {
      dispatch(loginFailure(error));
      return false;
    }
  }
}
