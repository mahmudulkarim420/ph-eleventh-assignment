import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider"; // ⚠ named import
const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
