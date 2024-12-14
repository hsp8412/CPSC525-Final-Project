"use client";
import axios from "axios";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const form = useFormik({
    initialValues: {
      ssn: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      ssn: Yup.string().max(255).required(),
      password: Yup.string().max(255).required(),
    }),
    onSubmit: async ({ssn, password}) => {
      setSubmitted(true);
      try {
        const res = await axios.post("http://localhost:8080/login", {
          username: ssn,
          password,
        });
        // console.log(res.data);
        localStorage.setItem("voter_token", res.data.token);
        router.push("/vote");
      } catch (error) {
        alert("Invalid credentials");
      }
      setSubmitted(false);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("voter_token");
    if (token) {
      router.push("/vote");
    }
  }, []);

  const {touched, errors, handleSubmit, handleChange, handleBlur, values} =
    form;

  return (
    <form onSubmit={handleSubmit} className="z-10 w-full px-32">
      <h1 className="text-4xl text-black font-bold text-center mb-10">Login</h1>
      <section className="mb-6">
        <label
          htmlFor="ssn"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Social Security Number
        </label>
        <input
          name="ssn"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ssn}
          type="text"
          id="ssn"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {touched.ssn && errors.ssn && (
          <p className="text-red-600">{errors.ssn}</p>
        )}
      </section>
      <section className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Password
        </label>
        <input
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {touched.password && errors.password && (
          <p className="text-red-600">{errors.password}</p>
        )}
      </section>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-neutral-600 hover:bg-neutral-500 py-2.5 px-4 rounded-lg text-white text-xl cursor-pointer flex items-center gap-2"
        >
          <div
            className={`${
              !submitted && "hidden"
            } animate-spin inline-block w-5 h-5 border-[4px] border-current border-t-transparent text-white rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
