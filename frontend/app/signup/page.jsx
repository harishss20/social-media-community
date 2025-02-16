"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const inputStyles = "peer py-3 px-12 rounded-md outline-none border-b-2 border-transparent bg-[#2f3138] text-[#cac8ff] placeholder:text-[#a3a3a3] focus:border-[#8b5cf6] duration-500 ease-out";
const formStyles = "flex flex-col space-y-5 min-w-[450px] p-12 rounded-2xl bg-[#292b34] shadow-2xl";
const iconStyles = "absolute top-[35px] left-5 text-base text-[#a3a3a3] peer-focus:text-[#cac8ff]";


export default function SignupPage() {
    return (
        <div className="wrapper text-sm font-Poppins">
            <div className="col1">
        <div className="hidden md:block">
          <img
            src="/dummy.png"
            alt="Dummy Image"
            className="w-[800px] h-auto"
          />
          </div>
            </div>

            <div className="col2">
                <form className={formStyles}>

                    <div className="flex flex-col space-y-1 relative">
                        <label className="">Email</label>
                        <input type="email" placeholder="example@gmail.com" className={inputStyles}/>
                        <FontAwesomeIcon icon={faEnvelope} className={iconStyles}/>
                    </div>

                    <div className="flex flex-col space-y-1 relative">
                        <label>Password</label>
                        <input type="password" placeholder="***********" className={inputStyles}/>
                        <FontAwesomeIcon icon={faKey} className={iconStyles}/>
                        </div>

                    <div>
                        <button className="min-w-full mt-3 py-3 rounded-md bg-[#ff3d3d] duringHover">Register</button>
                    </div>

                    <div className="flex items-center py-4">
                        <hr className="flex-1"/>
                        <span className="mx-4">or</span>
                        <hr className="flex-1"/>
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faGoogle} className="absolute z-10 text-lg top-[13px] left-[75px]"/>
                        <button className="min-w-full py-3 rounded-md bg-[#000] duringHover">Continue with Google</button>
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faFacebook} className="absolute z-10 text-lg top-[13px] left-[64px]"/>
                        <button className="min-w-full py-3 rounded-md bg-[#1877F2] duringHover">Continue with Facebook</button>
                    </div>

                    <div className="flex justify-center space-x-3">
                        <p>Already have an account?</p>
                        <a href="/login" className="text-sm font-bold text-[#cac8ff]">Login</a>
                    </div>
                    
                </form>
            </div>
            
        </div>
    );
}
