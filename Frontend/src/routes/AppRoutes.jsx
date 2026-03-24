import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoleSelect from '../pages/RoleSelect'
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import Home from '../pages/general/Home'; 
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile'
import ReelFeed from '../components/ReelFeed'
import Saved from '../pages/general/Saved'






const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element= {<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<RoleSelect />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path = "/create-food" element={<CreateFood />} />
        <Route path="/food-partner/profile/:id" element={<Profile />} />
        <Route path="/feed" element={<ReelFeed />} /> 
        <Route path="/saved" element={<Saved />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes