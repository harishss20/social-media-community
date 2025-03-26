import { faHome, faSearch, faSignOut, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <nav className="bg-[#30313b] text-white flex items-center justify-around px-6 py-4 sticky top-0 z-50">
        <div className="text-3xl font-bold text-purple-300">LADSPA</div>
        <div className="relative ml-24">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-purple-300" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#1e1f26] text-gray-300 pl-10 pr-4 py-2 focus:outline-none rounded-3xl w-96"
          />
        </div>
        <div className="flex space-x-8">
          <div onClick={() => router.push("/home")} className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
            <span className="text-xs">Home</span>
          </div>
          <div onClick={() => router.push("/profile")} className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
            <span className="text-xs">Profile</span>
          </div>
          <div onClick={handleLogout} className="flex flex-col items-center text-purple-300 cursor-pointer">
            <FontAwesomeIcon icon={faSignOut} className="text-2xl" />
            <span className="text-xs">Logout</span>
          </div>
        </div>
      </nav>

    );
}


export default Navbar;