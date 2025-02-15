"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const inputStyles = "peer py-3 px-12 rounded-md outline-none border-b-2 border-transparent bg-[#2f3138] text-[#cac8ff] placeholder:text-[#a3a3a3] focus:border-[#8b5cf6] duration-500 ease-out";
const formStyles = "flex flex-col space-y-5 min-w-[450px] p-12 rounded-2xl bg-[#292b34] shadow-2xl";
const iconBaseStyles = "absolute top-[35px] left-5 text-base transition-colors duration-500";

export default function DummyPage() {
    const [emailFilled, setEmailFilled] = useState(false);
    const [passwordFilled, setPasswordFilled] = useState(false);

    return (
        <div className="wrapper text-sm font-Poppins">
            <div className="col1">
                <p>
                    Logo
                </p>
            </div>

            <div className="col2">
                <form className={formStyles}>

                    <div className="flex flex-col space-y-1 relative">
                        <label className="text-white">Email</label>
                        <input 
                            type="email" 
                            placeholder="example@gmail.com" 
                            className={inputStyles}
                            onChange={(e) => setEmailFilled(e.target.value.length > 0)}
                        />
                        <FontAwesomeIcon 
                            icon={faEnvelope} 
                            className={`${iconBaseStyles} ${emailFilled ? 'text-[#cac8ff]' : 'text-[#a3a3a3]'}`} 
                        />
                    </div>

                    <div className="flex flex-col space-y-1 relative">
                        <label className="text-white">Password</label>
                        <input 
                            type="password" 
                            placeholder="***********" 
                            className={inputStyles}
                            onChange={(e) => setPasswordFilled(e.target.value.length > 0)}
                        />
                        <FontAwesomeIcon 
                            icon={faKey} 
                            className={`${iconBaseStyles} ${passwordFilled ? 'text-[#cac8ff]' : 'text-[#a3a3a3]'}`} 
                        />
                    </div>

                    <div>
                        <button className="min-w-full mt-3 py-3 rounded-md bg-[#ff3d3d] text-white duringHover">Register</button>
                    </div>

                    <div className="flex items-center py-4">
                        <hr className="flex-1 bg-white"/>
                        <span className="mx-4 text-white">or</span>
                        <hr className="flex-1 bg-white"/>
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faGoogle} className="absolute z-10 text-lg top-[13px] left-[75px] text-white"/>
                        <button className="min-w-full py-3 rounded-md bg-[#000] text-white duringHover">Continue with Google</button>
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faFacebook} className="absolute z-10 text-lg top-[13px] left-[64px] text-white"/>
                        <button className="min-w-full py-3 rounded-md bg-[#1877F2] text-white duringHover">Continue with Facebook</button>
                    </div>

                    <div className="flex justify-center space-x-3">
                        <p className="text-white">Already have an account?</p>
                        <a href="/login" className="text-sm font-bold text-[#CACBFF] text-[#8082CC] duringHover">Login</a>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}
