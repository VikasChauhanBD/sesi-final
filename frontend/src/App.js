import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Breadcrumbs from "./components/layout/Breadcrumbs";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Education from "./pages/Education";
import Events from "./pages/Events";
import Publications from "./pages/Publications";
import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Programmes from "./pages/Programmes";
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import Applications from "./admin/Applications";
import ApplicationDetail from "./admin/ApplicationDetail";
import Members from "./admin/Members";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route path="/*" element={
            <>
              <Header />
              <Breadcrumbs />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/programmes" element={<Programmes />} />
                <Route path="/education" element={<Education />} />
                <Route path="/events" element={<Events />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          } />

          {/* Admin Routes without Header/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/applications/:id" element={<ApplicationDetail />} />
          <Route path="/admin/members" element={<Members />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
