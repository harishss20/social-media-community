'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
  
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1E1F26] px-4 sm:px-0 overflow-hidden font-Poppins">
      {/* Main Container: Two sections with a gap */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-40 w-full max-w-screen-xl">
        {/* Left Side: Dummy SVG Image */}
        <div className="hidden md:block w-full max-w-full">
          <img src="/dummy.png" alt="Dummy Image" className="w-full h-auto" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-[450px] bg-[#292B34] p-8 rounded-2xl shadow-lg min-h-[30vh] mx-4 sm:mx-0">
          <form action="">
            {/* Email Field */}
            <div className="mb-4 w-full max-w-[360px] mx-auto">
              <label className="font-Poppins text-sm text-white">Email</label>
              <div className="flex items-center bg-[#2F3138] rounded-md px-4 py-2 mt-1 border-b-2 border-[#2F3138] focus-within:border-[#885cf6] duration-300">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={`text-base transition-colors ${emailFilled ? "text-[#CAC8FF]" : "text-[#a3a3a3]"}`}
                />
                <input
                  type="email"
                  className="w-full bg-transparent pl-3 text-[#CAC8FF] text-sm outline-none placeholder:text-[#a3a3a3] placeholder:text-sm py-1"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmailFilled(e.target.value.length > 0)}
                />
            </div>
            </div>
            {/* Password Field */}
            <div className="mb-5 relative w-full max-w-[360px] mx-auto">
              <label className="block text-[#EEEEEE] text-sm">Password</label>
              <div className="flex items-center bg-[#2F3138] rounded-md px-4 py-2 mt-1 border-b-2 border-[#2F3138] focus-within:border-[#885cf6] duration-300">
                <FontAwesomeIcon
                  icon={faKey}
                  className={`text-base transition-colors ${passwordFilled ? "text-[#CACBFF]" : "text-[#a3a3a3]"}`}
                />
                <input
                  type="password"
                  className="w-full bg-transparent pl-3 text-[#CAC8FF] text-sm outline-none placeholder:text-[#a3a3a3] placeholder:text-sm py-1 "
                  placeholder="Enter a secure password"
                  onChange={(e) => setPasswordFilled(e.target.value.length > 0)}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-[#CAC8FF] mb-5 gap-2 text-center max-w-[360px] mx-auto">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:text-[#A0A2E6] duration-300">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="mx-auto md:pl-3">
              <button
                type="submit"
                className="w-full max-w-[360px] mx-auto bg-[#ff3d3d] text-white py-2 rounded-lg hover:bg-[#ff5959] hover:brightness-110 duration-300 hover:ease-in-out text-base"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="mt-5 max-w-[360px] mx-auto text-center text-sm ">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#cac8ff] ">
              Register
            </a>
          </p>

          {/* OR Separator */}
          <div className="flex items-center max-w-[360px] mx-auto my-6">
            <hr className="flex-grow border-white" />
            <span className="px-3 text-white text-sm">or</span>
            <hr className="flex-grow border-white" />
          </div>

          {/* Social Login Buttons */}
          <button className="w-full max-w-[360px] mx-auto flex items-center justify-center p-3 text-sm font-Poppins rounded-md bg-black hover:brightness-150 duration-300 hover:ease-in-out text-white">
            <FontAwesomeIcon icon={faGoogle} className="pr-3 text-lg" />
            Login with Google
          </button>

          <button className="w-full max-w-[360px] mx-auto flex items-center justify-center text-sm font-Poppins bg-blue-600 text-white p-3 rounded-lg mt-5 hover:brightness-150 duration-300 hover:ease-in-out">
            <FontAwesomeIcon icon={faFacebook} className="pr-3 text-lg" />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
