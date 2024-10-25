import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GetUsers } from "./GetUsers";
import { toast } from "react-toastify";
import { DeleteUser } from "./DeleteUser";
import Pagination from "../../components/Pagination/Pagination.jsx";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const columns = ["User Information", "Status", "Role"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await GetUsers();
        setUsers(userData);
      } catch (error) {
        toast.error(`Error fetching users ${error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: false,
          closeOnClick: false,
          theme: "colored",
          transition: toast.flip,
        });
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Logic for displaying current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full px-5 py-2 mb-6 overflow-hidden md:ml-64 sm:ml-12 xs:ml-14">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((columnName) => (
                <th
                  key={columnName}
                  className="px-4 py-3 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 text-md bg-Purple"
                >
                  {columnName}
                </th>
              ))}
              <th className="px-4 py-3 text-white border-b border-gray-200 bg-Purple" />
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentUsers && currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <FaUserCircle
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div className="ml-2">
                        <div className="font-medium leading-5 text-gray-900 text-md">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm leading-6 text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2.5 py-1.5 text-sm font-semibold leading-5 text-white bg-Purple rounded-full">
                      {user.isActiveUser ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 leading-5 text-black whitespace-no-wrap border-b border-gray-200 text-md">
                    Buyer
                  </td>
                  <td className="px-4 py-4 font-medium leading-5 whitespace-no-wrap border-b border-gray-200 text-md">
                    <button
                      className={`${
                        !user.isActiveUser
                          ? "text-gray-700 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      onClick={() => DeleteUser(user.email, users, setUsers)}
                      disabled={!user.isActiveUser}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-lg text-red-600 bold">
                  No Users Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
