import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import PrivateRoute from "./components/privateRoute.jsx";

import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ScoreList from "./pages/ScoreList.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageScores from "./pages/admin/ManageScores.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageMessages from "./pages/admin/ManageMessages.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";


function QuizWrapper() {
    const { category } = useParams();

    return <Quiz key={category} />;
}

// Main component with routing and authentication modals
function App() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
            {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}

            <Layout
                openLogin={() => setShowLogin(true)}
                openSignUp={() => setShowSignUp(true)}>

                <Routes>

                    {/* Public routes */}
                    <Route path="/" element={<Home />} />

                    {/*  Quiz wrapper (fix state reset) */}
                    <Route path="/quiz/:category" element={<QuizWrapper />} />

                    <Route path="/scores" element={<ScoreList />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Admin routes */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        }/>

                    <Route
                        path="/admin/scores"
                        element={
                            <PrivateRoute>
                                <ManageScores />
                            </PrivateRoute>
                        }/>

                    <Route
                        path="/admin/users"
                        element={
                            <PrivateRoute>
                                <ManageUsers />
                            </PrivateRoute>
                        }/>

                    <Route
                        path="/admin/messages"
                        element={
                            <PrivateRoute>
                                <ManageMessages />
                            </PrivateRoute>
                        }/>

                    <Route
                        path="*"
                        element={<NotFound />} />

                </Routes>
            </Layout>
        </>
    );
}

export default App;