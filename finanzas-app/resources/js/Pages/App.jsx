import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Ingresos from './Ingresos';
import Categorias from './Categorias';
import Gastos from './Gastos';
import VerifyCode from './verifyCode';

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ingresos"
                        element={
                            <PrivateRoute>
                                <Ingresos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path = "/categorias"
                        element = {
                            <PrivateRoute>
                                <Categorias/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/gastos"
                        element={
                            <PrivateRoute>
                                <Gastos />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/verify" element={<VerifyCode />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
