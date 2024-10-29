import { useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function PrivateRoute({ children }) {
    let { authTokens } = useContext(AuthContext)
    return authTokens ? children : <Navigate to="/login" />;
}


export function SuperRoute({ children }) {
    const { authTokens, user} = useContext(AuthContext)

    return user ? (user.is_superuser ? children : <Navigate to="/403"></Navigate>) : <Navigate to="/login" />;
}