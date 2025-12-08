// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./styles/global.css"
import Home from './pages/Home'
import RecipeList from './pages/Recipes'
import About from './pages/About'
import Navbar from './components/Navbar';
import Footer from '../src/components/Footer';
import Login from '../src/pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddEditRecipe from './pages/Admin/AddEditRecipe';
import RecipeListAdmin from './pages/Admin/RecipeListAdmin';
import RecipeDetails from './pages/Admin/RecipeDetails';
import ScrollToTop from '../src/components/ScrollToTop';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<RecipeList />} />
        <Route path="/receitas/:id" element={<RecipeDetails />} /> {/* Rota para ver a receita */}
        <Route path="/sobre" element={<About />} />
        <Route path="/admin/login" element={<Login />} />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/recipes" 
          element={
            <PrivateRoute>
              <RecipeListAdmin />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/add" 
          element={
            <PrivateRoute>
              <AddEditRecipe />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin/edit/:id" 
          element={
            <PrivateRoute>
              <AddEditRecipe />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
