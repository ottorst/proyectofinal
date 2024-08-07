//Vendors
import { useCrud } from "../../CrudContext";
import { useState } from "react";
//Types
import { IUser } from "@/src/types/IUser";
//Components
import Modal from "./UserDetailsModal";


interface UsersDashboardRenderProps {
  users: IUser[];
}

const UsersDashboardRender: React.FC<UsersDashboardRenderProps> = ({ users }) => {
  const { handleUserDelete } = useCrud();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };




  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Users</h2>
      {users.length === 0 ? (
        <p className="text-white">No users available.</p>
      ) : (
        <>
          <div className="space-y-4">
            {currentUsers.map(user => (
              <div key={user.id} className="flex flex-col sm:flex-row justify-between items-center p-2 border-b">
                <div className="flex flex-col mb-4 sm:mb-0">
                  <p className="text-lg font-semibold text-white">{user.name}</p>
                  <p className="text-gray-400">{user.email}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 text-sm"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                    onClick={() => handleUserDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={selectedUser} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded text-sm ${currentPage === index + 1 ? 'bg-gray-600 text-white ' : 'bg-gray-200 text-gray-800'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersDashboardRender;
