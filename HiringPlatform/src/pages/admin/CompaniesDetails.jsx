import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCompanyModal from "./EditCompanyModal"; // Import the modal component
import AdminNavbar from "../../components/AdminNavbar";

function CompaniesDetails() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // State to track selected company for editing

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleEdit = (companyId) => {
    // Open modal for editing
    setIsModalOpen(true);
    setSelectedCompanyId(companyId);
  };

  const closeModal = () => {
    // Close modal
    setIsModalOpen(false);
    setSelectedCompanyId(null);
  };

  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`http://localhost:3001/companies/${companyId}`);
      // After successful deletion, fetch updated companies
      fetchCompanies();
      console.log("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-purple-700">
          Companies Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Unique ID</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Domain</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company._id} className="bg-white">
                  <td className="py-4 px-6">{company.uniqueId}</td>
                  <td className="py-4 px-6">{company.companyName}</td>
                  <td className="py-4 px-6">{company.location}</td>
                  <td className="py-4 px-6">{company.email}</td>
                  <td className="py-4 px-6">{company.phone}</td>
                  <td className="py-4 px-6">{company.domain}</td>
                  <td className="py-4 px-6">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(company._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Render the EditCompanyModal component */}
        <EditCompanyModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          companyId={selectedCompanyId}
          fetchCompanies={fetchCompanies}
        />
      </div>
    </>
  );
}

export default CompaniesDetails;
