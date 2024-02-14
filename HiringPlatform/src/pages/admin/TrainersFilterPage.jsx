import React, { useState } from "react";
import axios from "axios";
 
function TrainersFilterPage() {
  const [filterSkills, setFilterSkills] = useState("");
  const [filterChargePerDay, setFilterChargePerDay] = useState("");
  const [filteredTrainers, setFilteredTrainers] = useState([]);
 
  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:3001/trainers");
      let filteredData = response.data;
 
      // Filter by skills
      if (filterSkills) {
        filteredData = filteredData.filter((trainer) =>
          trainer.skills.toLowerCase().includes(filterSkills.toLowerCase())
        );
      }
 
      // Filter by charge per day
      if (filterChargePerDay) {
        filteredData = filteredData.filter(
          (trainer) => trainer.chargePerDay <= parseFloat(filterChargePerDay)
        );
      }
 
      // Check if both conditions are true
      if (filterSkills && filterChargePerDay) {
        setFilteredTrainers(filteredData);
      } else {
        // Reset filtered trainers if one or both conditions are not met
        setFilteredTrainers([]);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-purple-700">
            Filter Trainers
          </h2>
          <div className="flex mb-4">
            <label htmlFor="filterSkills" className="mr-2">
              Filter by Skills:
            </label>
            <input
              type="text"
              id="filterSkills"
              value={filterSkills}
              onChange={(e) => setFilterSkills(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mr-4"
            />
            <label htmlFor="filterChargePerDay" className="mr-2">
              Filter by Charge/Day:
            </label>
            <input
              type="text"
              id="filterChargePerDay"
              value={filterChargePerDay}
              onChange={(e) => setFilterChargePerDay(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mr-4"
            />
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Filter
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Filtered Trainers</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Email</th>
                  <th className="p-3 border border-gray-300">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainers.map((trainer) => (
                  <tr key={trainer._id} className="bg-white">
                    <td className="p-3 border border-gray-300">
                      {trainer.name}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {trainer.email}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {trainer.contactNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default TrainersFilterPage;