import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {
  const token = useSelector((state) => state.token);
  const route = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          toast.success("Created Success", {
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
        })
        .catch((error) => {
          toast.error(
            `Created Failed : ${
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
        });
    },
  });

  return (
    <div>
      <Navbar />
      <h1 className="my-10 text-2xl font-bold text-center">Create User</h1>
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

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            {...formik.getFieldProps("password_confirmation")}
            className={`mt-1 p-2 w-full border rounded-md ${
              formik.touched.password_confirmation &&
              formik.errors.password_confirmation
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.password_confirmation &&
          formik.errors.password_confirmation ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password_confirmation}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-emerald-400 px-4 py-2 text-white rounded-md"
          disabled={formik.isSubmitting}
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserCreate;
