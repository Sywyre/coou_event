import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const decoded = jwtDecode(jwt);
    return decoded.aud === import.meta.env.VITE_FIREBASE_PROJECTID
      ? { user: true }
      : { user: false };
  } else {
    localStorage.clear();
    navigate("/login");
    return { user: false };
  }
};

export default useAuth;
