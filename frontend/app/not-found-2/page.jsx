export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-[#1E1F26]">
            <h1 className="text-8xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl font-semibold text-white mt-4">
                Sorry, we couldn't find this page.
            </h2>
            <a 
                href="/" 
                className="mt-6 px-6 py-3 text-white bg-[#ff3d3d] rounded-md transition duration-300 hover:bg-[#ff6b6b]"
            >
                Home
            </a>
        </div>
    );
}


