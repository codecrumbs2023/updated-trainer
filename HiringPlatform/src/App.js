import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import BusinessRegister from "./pages/business-register/BusinessRegister";
import SignIn from "./pages/sign-in/SignIn";
import TrainerRegister from "./pages/trainer-register/TrainerRegister";
import TrainerDashboard from "./pages/trainer-register/TrainerDashboard";
import BusinessDashboard from "./pages/business-register/BusinessDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TrainersDetails from "./pages/admin/TrainersDetails";
import CompaniesDetails from "./pages/admin/CompaniesDetails";
import BusinessRequestsDetails from "./pages/admin/BusinessRequestDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-register" element={<BusinessRegister />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/trainer-register" element={<TrainerRegister />} />
        <Route
          path="/trainer-dashboard"
          element={
            <ProtectedRoute component={TrainerDashboard} roles={["trainer"]} />
          }
        />
        <Route
          path="/business-dashboard"
          element={
            <ProtectedRoute component={BusinessDashboard} roles={["company"]} />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute component={AdminDashboard} roles={["admin"]} />
          }
        />
        <Route
          path="/trainers-details"
          element={
            <ProtectedRoute
              component={TrainersDetails}
              roles={["admin", "trainer"]}
            />
          }
        />
        <Route
          path="/companies-details"
          element={
            <ProtectedRoute
              component={CompaniesDetails}
              roles={["admin", "company"]}
            />
          }
        />
        <Route
          path="/business-requests"
          element={
            <ProtectedRoute
              component={BusinessRequestsDetails}
              roles={["admin", "company"]}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
