import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

interface DecodedJWT {
  UserInfo: {
    userId: string;
    verified: boolean;
    isAdmin: boolean;
  };
}

export const useAuth = (): { userId: string; verified: boolean; isAdmin: boolean } | null => {
  const token = useSelector(selectCurrentToken);
  if (token) {
    const decoded: DecodedJWT = jwtDecode(token);

    return decoded.UserInfo;
  }

  return null;
};
