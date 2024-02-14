import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTrainerModal from "./EditTrainerModal"; // Import the modal component
import AdminNavbar from "../../components/AdminNavbar";

function TrainersDetails() {
  const [trainers, setTrainers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/trainers");
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/trainers/${id}`);
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
      console.log("Trainer deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-purple-700">
          Trainers Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Contact Number</th>
                <th className="py-3 px-6 text-left">Skills</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Charge/day</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="bg-white">
                  <td className="py-4 px-6">{trainer.username}</td>
                  <td className="py-4 px-6">{trainer.name}</td>
                  <td className="py-4 px-6">{trainer.email}</td>
                  <td className="py-4 px-6">{trainer.contactNumber}</td>
                  <td className="py-4 px-6">{trainer.skills}</td>
                  <td className="py-4 px-6">{trainer.address}</td>
                  <td className="py-4 px-6">{trainer.chargePerDay}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEdit(trainer)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trainer._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Edit Trainer Modal */}
        <EditTrainerModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          trainer={selectedTrainer}
          fetchTrainers={fetchTrainers}
        />
      </div>
    </>
  );
}

export default TrainersDetails;
