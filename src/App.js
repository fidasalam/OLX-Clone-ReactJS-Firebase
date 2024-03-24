import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import { AuthContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config'; 

function App() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set user in context
        });

        return () => unsubscribe(); // Unsubscribe from the auth state change listener when component unmounts
    }, [setUser]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                 <Route path="/sell" element={<Create />} />
                 <Route path="/view/:productId" element={<View />} /> 
            </Routes>
        </Router>
    );
}

export default App;
