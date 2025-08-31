import { useState } from "react";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recipient = "ritesh.pan04@gmail.com";

    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-white/40 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Pdf Viewer</span>.
          This application helps you organize, preview, and download documents
          with a clean and modern UI.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-white/40 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border rounded-lg bg-gray-50"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
