import LoginRegister from "../pages/LoginRegister";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import User from "../pages/User";

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
        path: 'user/:id',
        element: (
            <ProtectedRoute>
                <User />
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