import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BusinessRequestModal from "./BusinessRequestModal";
import AdminNavbar from "../../components/AdminNavbar";
import TrainersFilterPage from "./TrainersFilterPage";

function calculatePricePerDay(request) {
  const startDate = new Date(request.startDate);
  const endDate = new Date(request.endDate);
  const durationInMilliseconds = endDate - startDate;
  const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  const durationOfTraining = request.durationOfTraining;
  const trainingBudget = request.trainingBudget;

  if (durationOfTraining <= 0) {
    return "Invalid duration";
  }

  const pricePerDay = trainingBudget / (durationInDays * durationOfTraining);
  return isNaN(pricePerDay) ? "Invalid price" : pricePerDay.toFixed(2);
}

function BusinessRequestsDetails() {
  const [businessRequests, setBusinessRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessRequests();
  }, []);

  const fetchBusinessRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/businessrequests"
      );
      setBusinessRequests(response.data);
    } catch (error) {
      console.error("Error fetching business requests:", error);
    }
  };

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReject = async (businessId) => {
    try {
      // Send a DELETE request to the backend to delete the record
      await axios.delete(
        `http://localhost:3001/businessrequests/${businessId}`
      );

      // If the deletion is successful, update the state to remove the deleted record
      setBusinessRequests((prevBusinessRequests) =>
        prevBusinessRequests.filter((request) => request._id !== businessId)
      );

      console.log("Business request rejected successfully");
    } catch (error) {
      console.error("Error rejecting business request:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = businessRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <AdminNavbar />
      <TrainersFilterPage />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-purple-700">
          Business Requests Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Batch Name</th>
                <th className="py-3 px-6 text-left">Technology</th>
                <th className="py-3 px-6 text-left">Start Date</th>
                <th className="py-3 px-6 text-left">End Date</th>
                <th className="py-3 px-6 text-left">Training Budget</th>
                <th className="py-3 px-6 text-left">Price Per Day</th>
                <th className="py-3 px-6 text-left">Company Name</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((request) => (
                <tr key={request._id} className="bg-white">
                  <td className="py-4 px-6">{request.batchName}</td>
                  <td className="py-4 px-6">{request.technology}</td>
                  <td className="py-4 px-6">{request.startDate}</td>
                  <td className="py-4 px-6">{request.endDate}</td>
                  <td className="py-4 px-6">{request.trainingBudget}</td>
                  <td className="py-4 px-6">{calculatePricePerDay(request)}</td>
                  <td className="py-4 px-6">
                    {typeof request.companyId === "object"
                      ? request.companyId.companyName
                      : request.companyId}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      onClick={() => handleOpenModal(request)}
                    >
                      Submit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= businessRequests.length}
          >
            Next
          </button>
        </div>

        {/* Render the modal */}
        {isModalOpen && (
          <BusinessRequestModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            request={selectedRequest}
          />
        )}
      </div>
    </>
  );
}

export default BusinessRequestsDetails;
