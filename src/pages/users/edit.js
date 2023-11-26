import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate,  useLocation } from "react-router-dom";

const UserEdit = () => {
 const token = useSelector((state) => state.token);
  const route = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/user/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Updated Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        route("/user");
      } catch (error) {
        toast.error(
          `Update Failed : ${
            JSON.parse(error?.response?.data)?.name
              ? JSON.parse(error?.response?.data)?.name[0]
              : ""
          } ${
            JSON.parse(error?.response?.data)?.email
              ? JSON.parse(error?.response?.data)?.email[0]
              : ""
          } ${
            JSON.parse(error?.response?.data)?.password
              ? JSON.parse(error?.response?.data)?.password[0]
              : ""
          }`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        formik.setValues({
          name: response.data.data.name,
          email: response.data.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="my-10 text-2xl font-bold text-center">Edit User</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-emerald-400 px-4 py-2 text-white rounded-md"
          disabled={formik.isSubmitting}
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
