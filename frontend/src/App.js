import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Breadcrumbs from "./components/layout/Breadcrumbs";

// Public Pages
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Registration from "./pages/Registration";
import NewsHighlights from "./pages/NewsHighlights";
import EventsPage from "./pages/EventsPage";
import { ExecutiveCommittee, CommitteeMemberProfile } from "./pages/ExecutiveCommittee";
import { EducationInitiatives, ResearchSupport, CommunityOutreach } from "./pages/Programs";
import { CoursesCME, WorkshopsSkillLabs, Fellowship, TrainingResources } from "./pages/EducationPages";

// Placeholder pages (to be implemented)
import About from "./pages/About";
import Membership from "./pages/Membership";
import MembersDirectory from "./pages/MembersDirectory";
import Publications from "./pages/Publications";
import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import Applications from "./admin/Applications";
import ApplicationDetail from "./admin/ApplicationDetail";
import Members from "./admin/Members";
import ManageCommittee from "./admin/ManageCommittee";
import ManageEvents from "./admin/ManageEvents";
import ManageNews from "./admin/ManageNews";
import ManageGallery from "./admin/ManageGallery";

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Header/Footer */}
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/about" element={<About />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/members" element={<MembersDirectory />} />
                <Route path="/registration" element={<Registration />} />
                
                {/* Executive Committee */}
                <Route path="/executive-committee" element={<ExecutiveCommittee />} />
                <Route path="/executive-committee/:slug" element={<CommitteeMemberProfile />} />
                
                {/* Programs */}
                <Route path="/programs" element={<EducationInitiatives />} />
                <Route path="/programs/education-initiatives" element={<EducationInitiatives />} />
                <Route path="/programs/research-support" element={<ResearchSupport />} />
                <Route path="/programs/community-outreach" element={<CommunityOutreach />} />
                
                {/* Education */}
                <Route path="/education" element={<CoursesCME />} />
                <Route path="/education/courses-cme" element={<CoursesCME />} />
                <Route path="/education/workshops" element={<WorkshopsSkillLabs />} />
                <Route path="/education/fellowship" element={<Fellowship />} />
                <Route path="/education/training-resources" element={<TrainingResources />} />
                
                {/* Publications */}
                <Route path="/publications" element={<Publications />} />
                <Route path="/publications/jsesi" element={<Publications />} />
                <Route path="/publications/manuscript-submission" element={<Publications />} />
                <Route path="/publications/newsletters" element={<Publications />} />
                
                {/* Resources */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/guidelines" element={<Resources />} />
                <Route path="/resources/downloads" element={<Resources />} />
                <Route path="/resources/links" element={<Resources />} />
                
                {/* News & Events */}
                <Route path="/news" element={<NewsHighlights />} />
                <Route path="/news/:id" element={<NewsHighlights />} />
                <Route path="/events" element={<EventsPage />} />
                
                {/* Other */}
                <Route path="/gallery" element={<Gallery />} />
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
          <Route path="/admin/committee" element={<ManageCommittee />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/news" element={<ManageNews />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
