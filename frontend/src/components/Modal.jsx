import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import UserService from "../services/user.service";

const Modal = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    login,
    createUser,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (name === "Login") {
      login(data.email, data.password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          document.getElementById(name).close();
          Swal.fire({
            title: "Login",
            text: "login successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            setValue("email", "");
            setValue("password", "");
            navigate(from);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createUser(data.email, data.password)
        .then(async (result) => {
          const user = result.user;
          console.log(user);
          await UserService.addUser(user.email);
          document.getElementById(name).close();
          Swal.fire({
            title: "Register",
            text: "register new user successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate(from);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const googleSignUp = () => {
    signUpWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        // to do add user to database
        await UserService.addUser(user.email);
        document.getElementById(name).close();
        Swal.fire({
          title: "Register",
          text: "Google Sign Up successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(from);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const githubSignUp = () => {
    signUpWithGithub()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        // to do add user to database
        await UserService.addUser(user.email);
        document.getElementById(name).close();
        Swal.fire({
          title: "Github authenticate",
          text: "authenticate successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(from);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const facebookSignUp = () => {
    signUpWithFacebook()
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        // to do add user to database
        await UserService.addUser(user.email);
        document.getElementById(name).close();
        Swal.fire({
          title: "Facebook authenticate",
          text: "authenticate successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(from);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/*
      How to use
      onClick={() => document.getElementById("login").showModal()}
       */}
      <dialog id={name} className="modal">
        <div className="modal-box">
          <div className="modal-action mt-2 ml-2 flex-col justify-center">
            <h3 className="text-xl text-center font-bold capitalize">{name}</h3>
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
                {...register(
                  "password",
                  { required: true },
                  { min: 6, max: 99 }
                )}
              />
              {/* Forgot password */}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* Submit btn */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-red text-white capitalize"
              >
                {name}
              </button>
            </div>
            {/* Sign up */}
            {name && name === "Login" ? (
              <p className="text-center my-2">
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    document.getElementById(name).close();
                    document.getElementById("Register").showModal();
                  }}
                  className="underline ml-1 text-red hover:cursor-pointer"
                >
                  Sign up now!
                </a>
              </p>
            ) : (
              <p className="text-center my-2">
                Have an account?{" "}
                <a
                  onClick={() => {
                    document.getElementById(name).close();
                    document.getElementById("Login").showModal();
                  }}
                  className="underline ml-1 text-red hover:cursor-pointer"
                >
                  Sign in now!
                </a>
              </p>
            )}
            {/* Providers icon */}
            <div className="space-x-3 mt-3 flex justify-center items-center">
              <button
                className="btn rounded-full"
                onClick={() => googleSignUp()}
              >
                <FaGoogle className="size-4" />
              </button>
              <button
                className="btn rounded-full"
                onClick={() => facebookSignUp()}
              >
                <FaFacebook className="size-4" />
              </button>
              <button
                className="btn rounded-full"
                onClick={() => githubSignUp()}
              >
                <FaGithub className="size-4" />
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
