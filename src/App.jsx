import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Index';
import Admin from './pages/AdminIndex';
import { useEffect } from 'react';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData, setReloadData } from './redux/rootslice';
import Login from './pages/Login';
import AdminRegister from './pages/AdminRegister';
import Layout from './pages/Layout';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Courses from './pages/Courses';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ResetPassword from './pages/Adminpasswordreset';
import ProtectedRoute from './protectedRoute';
import Header from './components/Header';

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  
  
  return (
    <>
      <BrowserRouter>
        {loading && <Loader />}
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experiences />} />
            <Route path="project" element={<Projects />} />
            <Route path="course" element={<Courses />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-register" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
//   <>
//   <BrowserRouter>
//     {loading && <Loader />} {/* Show loader while loading */}
//     <Header />
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/home" element={<Layout />}>
//         {/* Render only if portfolioData exists */}
//         {portfolioData && (
//           <>
//             <Route index element={<Home />} />
//             <Route path="about" element={<About />} />
//             <Route path="experience" element={<Experiences />} />
//             <Route path="project" element={<Projects />} />
//             <Route path="course" element={<Courses />} />
//             <Route path="contact" element={<Contact />} />
//           </>
//         )}
//       </Route>
//       <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//       <Route path="/admin-register" element={<AdminRegister />} />
//     </Routes>
//   </BrowserRouter>
// </>
  
}

export default App;
