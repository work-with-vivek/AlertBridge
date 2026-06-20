import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RegisterBreach from "./pages/RegisterBreach";
import Compliance from "./pages/Compliance";
import Intelligence from "./pages/Intelligence";
import PublicRegistry from "./pages/PublicRegistry";
import UserManagement from "./pages/UserManagement";
import AuditLogs from "./pages/AuditLogs";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import BreachDetails from "./pages/BreachDetails";
import SecurityAnalytics from "./pages/SecurityAnalytics";
import AttackMap from "./pages/AttackMap";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    return token
        ? children
        : <Navigate to="/login" replace />;

}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <SecurityAnalytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <ProtectedRoute>
                            <RegisterBreach />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/compliance"
                    element={
                        <ProtectedRoute>
                            <Compliance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/intelligence"
                    element={
                        <ProtectedRoute>
                            <Intelligence />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/public"
                    element={
                        <ProtectedRoute>
                            <PublicRegistry />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/breach/:id"
                    element={
                        <ProtectedRoute>
                            <BreachDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/audit"
                    element={
                        <ProtectedRoute>
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

                <Route
                    path="/attack-map"
                    element={
                        <ProtectedRoute>
                            <AttackMap />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;