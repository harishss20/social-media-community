'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) return;
    try {
      const response = await fetch(
        `http://localhost:8000/api/register/?username=${username}`
      );

      const data = await response.json();
      setIsUsernameAvailable(data.message);
      console.log(data.message);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  useEffect(() => {
    const newErrors = {};

    if (touched.username) {
      if (username.length < 3 && username.length != "") {
        newErrors.username = "Username must be at least 3 characters.";
      } else if (isUsernameAvailable === false) {
        newErrors.username = "Username is already taken.";
      }
    }

    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && email.length != "") {
        newErrors.email = "Enter a valid email.";
      }
    }

    if (touched.password) {
      if (password.length < 8 && password.length != "") {
        newErrors.password = "Password must be at least 8 characters.";
      }
    }

    if (touched.confirmPassword) {
      if (password !== confirmPassword && confirmPassword != "") {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    (touched.username ||
      touched.email ||
      touched.password ||
      touched.confirmPassword) &&
      setIsFormValid(Object.keys(newErrors).length === 0);
  }, [
    username,
    isUsernameAvailable,
    email,
    password,
    confirmPassword,
    touched,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    if(username.length < 3 || email.length < 3 || password.length < 3 || confirmPassword.length < 3){
      alert("Please fill all the fields");
      return;
    } 
    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.message === true) {
        alert("Signup successful!");
        router.push("/login");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  };
  return (
    <div className="mainContainer">
      <div>
        <img src="/dummy.png" alt="Dummy Image" className="loginSvg" />
      </div>

      <div className="">
        <form className="loginFormLayout text-xs" onSubmit={handleSubmit}>
          <div className="loginInputContainer relative">
            <label className="">Username</label>
            <input
              maxLength={15}
              min={3}
              type="text"
              placeholder="Name"
              className={`loginInput  ${username == "" ? "" : "text-[#cac8ff]"}`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                checkUsernameAvailability(e.target.value);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
            />

            {touched.username && errors.username && (
              <p className="absolute right-0 top-[49px] text-[10px] text-red-500">
                {errors.username}
              </p>
            )}

            <FontAwesomeIcon
              icon={faUser}
              className={
                username == ""
                  ? "absolute top-[26px] left-2 text-[#a3a3a3]"
                  : "absolute top-[25px] left-2 text-[#cac8ff]"
              }
            />
          </div>

          <div className="loginInputContainer relative">
            <label className="">Email</label>
            <input
              type="email"
              tooltip="Enter a valid email address"
              placeholder="example@gmail.com"
              className={`loginInput  ${email == "" ? "" : "text-[#cac8ff]"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            />
            {touched.email && errors.email && (
              <p className="absolute right-0 top-[49px] text-[10px] text-red-500">
                {errors.email}
              </p>
            )}

            <FontAwesomeIcon
              icon={faEnvelope}
              className={
                email == ""
                  ? "absolute top-[26px] left-2 text-[#a3a3a3]"
                  : "absolute top-[25px] left-2 text-[#cac8ff]"
              }
            />
          </div>

          <div className="loginInputContainer relative">
            <label className="">Password</label>
            <input
              type="password"
              placeholder="********"
              className={`loginInput  ${password == "" ? "" : "text-[#cac8ff]"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
            {touched.password && errors.password && (
              <p className="absolute right-0 top-[49px] text-[10px] text-red-500">
                {errors.password}
              </p>
            )}
            <FontAwesomeIcon
              icon={faKey}
              className={
                password == ""
                  ? "absolute top-[26px] left-2 text-[#a3a3a3]"
                  : "absolute top-[25px] left-2 text-[#cac8ff]"
              }
            />
          </div>

          <div className="loginInputContainer relative">
            <label className="">Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              className={`loginInput  ${confirmPassword == "" ? "" : "text-[#cac8ff]"}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
            />
            {touched.confirmPassword &&
              !errors.password &&
              errors.confirmPassword && (
                <p className="absolute right-0 top-[49px] text-[10px] text-red-500">
                  {errors.confirmPassword}
                </p>
              )}

            <FontAwesomeIcon
              icon={faKey}
              className={
                confirmPassword == ""
                  ? "absolute top-[26px] left-2 text-[#a3a3a3]"
                  : "absolute top-[25px] left-2 text-[#cac8ff]"
              }
            />
          </div>

          <button
            type="submit"
            className="loginButton mt-3 bg-[#ff3d3d]"
            disabled={!isFormValid}
          >
            Register
          </button>

          <div className="flex items-center w-full">
            <hr className="flex-1" />
            <span className="mx-4">or</span>
            <hr className="flex-1" />
          </div>

          <div className="w-full relative">
            <FontAwesomeIcon
              icon={faGoogle}
              className="absolute top-2 left-9"
            />
            <button className="loginButton bg-[#1d1d21]">Continue with Google</button>
          </div>

          <div className="w-full relative">
            <FontAwesomeIcon
              icon={faFacebook}
              className="absolute top-2 left-7"
            />
            <button className="loginButton bg-[#1877F2]">Continue with Facebook</button>
          </div>

          <div className="w-full flex justify-evenly">
            <p>Already have an account?</p>
            <a href="/login" className="font-bold text-[#cac8ff]">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}