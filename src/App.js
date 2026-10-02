import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Coursepage from "./components/Coursepage";
import Login from "./components/Login"; 
import Courseupload from "./components/Courseupload";
import Apply from "./components/Apply";
import Homepage from "./components/Homepage";
import ProfileHome from "./components/ProfileHome";
import Signup from "./components/Signup";
import Coursedetail from "./components/Coursedetail";
import Javacompiler from "./components/profile/Javacompiler";

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        {/*
        ==========================================
        HOME REDIRECT
        ==========================================
        */}

        <Route
          path="/profile"
          element={<ProfileHome />}
        />

        
        <Route
          path="/Compiler/:id"
          element={<Javacompiler />}
        />

        {/*
        ==========================================
        ALL COURSES
        ==========================================
        */}

        <Route
          path="/courses"
          element={<Coursepage />}
        />
    
        
        <Route
          path="/apply"
          element={<Apply />}
        />
        {/*
        ==========================================
        UPLOAD COURSE
        ==========================================
        */}

         <Route
          path="/"
          element={<Navigate to="/Homepage" />}
        />

        <Route    
        path="/Homepage"
        element={<Homepage />}
        />
       
              <Route 
              path="/Signup"
              element={<Signup/>}
              /> 
        <Route
          path="/upload"
          element={<Courseupload />}
        />

         <Route
          path="/profile"
          element={<ProfileHome/>}
        />
        <Route
          path="/login"
          element={<Login />}
        />  

        {/*
        ==========================================
        SINGLE COURSE
        ==========================================
        */}

        <Route
          path="/course/:id"
          element={<Coursedetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;