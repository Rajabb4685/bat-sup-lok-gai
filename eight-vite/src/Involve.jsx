import { Link } from "react-router-dom";

export default function Involve() {
  return (
    <div className="bg-polka min-h-screen px-10 py-10 font-sans text-gray-800">

      <h1 className="text-4xl font-serif text-center bg-primary rounded-lg font-bold text-cream mb-8 px-6 py-2">
        Get Involved
      </h1>

      <div className="max-w-md mx-auto bg-primary text-cream p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-serif mb-4">Join Our Mailing List</h2>

        <p className="mt-2 mb-6">
          Stay updated on the businesses on 86th Street. Choose how often you want to hear from us!
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-serif italic">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 rounded text-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1 font-serif italic">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 rounded text-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1 font-serif italic">
              How often would you like to hear from us?
            </label>
            <select className="w-full p-2 rounded text-gray-800">
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cream text-primary font-serif font-semibold px-4 py-2 rounded hover:bg-white transition"
          >
            Subscribe
          </button>
        </form>
      </div>

    </div>
  );
}
