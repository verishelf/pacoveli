"use client";

import { useState } from "react";

interface ContactFormProps {
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // In production, use an API route or form service (e.g. Formspree, Resend)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-400">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-400">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white placeholder-zinc-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Your message..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-white px-6 py-3 text-black transition hover:bg-zinc-200 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-400">Message sent. We&apos;ll be in touch.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Try emailing directly:{" "}
          <a href={`mailto:${email}`} className="underline">
            {email}
          </a>
        </p>
      )}
    </form>
  );
}
