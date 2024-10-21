import { useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useUser } from "../utils/SWR";

export default function PrivateRoute({ children }) {
    let { authTokens } = useContext(AuthContext)
    return authTokens ? children : <Navigate to="/login" />;
}


export function SuperRoute({ children }) {
    const { authTokens } = useCallback(AuthContext)
    const user = useUser(authTokens?.access)?.user
    return user?.is_superuser ? children : <Navigate to="/403" />;
}