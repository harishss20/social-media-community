export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold text-red-500">404 - User Not Found</h1>
            <p className="text-gray-600">The user ID you entered does not exist.</p>
            <div className="flex flex-row justify-evenly space-x-5">
                <a href="/signup" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Register
                </a>
                <a href="/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Login
                </a>
            </div>
        </div>
    );
}
