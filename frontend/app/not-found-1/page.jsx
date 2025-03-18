export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-[#1E1F26]">
            <h1 className="text-8xl font-bold text-red-500">401</h1>
            <h2 className="text-2xl font-semibold text-white mt-4">
             You don't have access to this page.
            </h2>
            <div className="flex flex-row justify-evenly space-x-5">
                <a 
                    href="/signup" 
                    className="mt-4 px-4 py-2 bg-[#ff3d3d] text-white rounded-md transition duration-300 hover:bg-[#ff6b6b]"
                >
                    Register
                </a>
                <a 
                    href="/login" 
                    className="mt-4 px-4 py-2 bg-[#ff3d3d] text-white rounded-md transition duration-300 hover:bg-[#ff6b6b]"
                >
                    Login
                </a>
            </div>
        </div>
    );
}
