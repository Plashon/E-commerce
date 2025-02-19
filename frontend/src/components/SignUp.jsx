import React, { useContext } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "./../contexts/AuthContext";
import { useNavigate } from "react-router";
import UserService from "./../services/UserService"; 

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result);
        await 
        Swal.fire({
          icon: "success",
          title: "Register successfully",
          showConfirmButton: true,
          timer: 1500,
        }).then(navigate("/"));
        //const user = result.user;
        //console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
    // document.getElementById("Login_form").close()
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="modal-box">
        <div className="modal-action mt-2 ml-2 flex-col justify-center">
          <h3 className="text-xl font-bold">Please Register</h3>
        </div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          {/* form section */}
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true }, { min: 6, max: 99 })}
            />
            {/* Forgot password */}
          </div>
          {/* Submit btn */}
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-red text-white">
              Register
            </button>
          </div>
          {/* Sign up */}
          <p className="text-center my-2">
            Do have an account?{" "}
            <a href="/signup" className="underline ml-1">
              Sign in now!
            </a>
          </p>
          {/* Providers icon */}
          <div className="space-x-3 flex justify-center items-center">
            <button className="btn rounded-full">
              <FaGoogle className="size-4" />
            </button>
            <button className="btn rounded-full">
              <FaFacebook className="size-4" />
            </button>
            <button className="btn rounded-full">
              <FaGithub className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
