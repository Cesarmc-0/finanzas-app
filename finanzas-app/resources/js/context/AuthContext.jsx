import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [pendingEmail, setPendingEmail] =useState(null);
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    }); 

    //login
    const login = async (email, password) => {
        const { data } = await api.post('/login', { email, password });
        setPendingEmail(email);

    };

    const verify = async (code) => {
        const { data } = await api.post('/verify', {email: pendingEmail, codigo: code});
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    }

    //Register

    const register = async (name, email, password, password_confirmation) =>{
        const {data} = await api.post('/register',{name, email, password, password_confirmation});
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    }
    //logout
    const logout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login,register, logout, verify, pendingEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
