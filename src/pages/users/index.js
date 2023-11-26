import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../components/auth/Delete";
import Navbar from "../../components/Navbar";

const User = () => {
  const [fetchUser, setFetchUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const route = useNavigate();
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setFetchUser(result.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          route("/login");
        }
      });
  };
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      closeDeleteModal();
      toast.success("Delete Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      getUser();
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      console.log("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="my-10 text-2xl font-bold text-center">Data User</h1>
      <div className="relative overflow-x-auto max-w-[1000px] mx-auto">
        <Link to={"/user/create"}>
          <button className="bg-emerald-400 px-2 py-2 mb-4 text-white rounded-md">
            Tambah
          </button>
        </Link>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchUser?.map((item, key) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {key + 1}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td>
                    <Link to={`/user/edit?id=${item.id}`}>
                      <button className="bg-orange-400 px-2 py-1 mb-4 text-white rounded-md">
                        edit
                      </button>
                    </Link>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="bg-red-400 px-2 py-1 mb-4 text-white rounded-md ml-4"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default User;
