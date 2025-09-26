import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
