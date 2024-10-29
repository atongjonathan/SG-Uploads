import { useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function PrivateRoute({ children }) {
    let { authTokens } = useContext(AuthContext)
    console.log(authTokens)
    return authTokens ? children : <Navigate to="/" />;
}


export function SuperRoute({ children }) {
    const { user } = useContext(AuthContext)

    return user ? (user.is_superuser ? children : <Navigate to="/403"></Navigate>) : <Navigate to="/" />;
}