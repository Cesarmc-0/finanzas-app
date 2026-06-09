import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Ingresos from './Ingresos';
import Categorias from './Categorias';
import Gastos from './Gastos';
import VerifyCode from './verifyCode';
import AdminUsuarios from './AdminUsuarios';
import AdminDashboard from './AdminDashboard';

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}
function AdminRoute({ children }){
    const {user} = useAuth();
    return user && user.rol === 'admin'  ? children : <Navigate to="/dashboard" replace />;
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
                    <Route
                        path='/admin/dashboard'
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path='/admin/usuarios'
                        element={
                            <AdminRoute>
                                <AdminUsuarios />
                            </AdminRoute>
                        }
                    >
                        
                    </Route>
                    <Route path="/verify" element={<VerifyCode />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
