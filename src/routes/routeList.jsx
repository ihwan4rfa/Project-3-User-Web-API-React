import LoginRegister from "../pages/LoginRegister";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

export const routeList = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: '/login',
        element: <LoginRegister />
    },
    {
        path: '/register',
        element: <LoginRegister />
    }
]