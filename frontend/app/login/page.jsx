"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const newErrors = {};

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

        setErrors(newErrors);
        (touched.email || touched.password) &&
            setIsFormValid(Object.keys(newErrors).length === 0);
    }, [email, password, touched]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.status === 200) {
                alert("Login successful!");
                router.push("/home");
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
                        <label className="">Email</label>
                        <input
                            type="email"
                            tooltip="Enter a valid email address"
                            placeholder=" example@gmail.com"
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

                    <button
                        type="submit"
                        className="loginButton mt-3 bg-[#ff3d3d]"
                        disabled={!isFormValid}
                    >
                        Log In
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
                        <p>Don't have an account?</p>
                        <a href="/signup" className="font-bold text-[#cac8ff]">
                            Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}