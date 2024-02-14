import React from "react";
import AdminNavbar from "../../components/AdminNavbar"; // Assuming AdminNavbar component is in the same directory
// import BusinessRequestsDetails from "./BusinessRequestDetails";
// import CompaniesDetails from "./CompaniesDetails";
// import PurchaseOrderComponent from "./PurchaseOrderComponent";
// import TrainersDetails from "./TrainersDetails";
// import TrainersFilterPage from "./TrainersFilterPage";
import RevenueAnalysisPage from "./RevenueAnalysisPage";

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar /> {/* Include the AdminNavbar here */}
<RevenueAnalysisPage />    </div>
  );
}

export default AdminDashboard;
