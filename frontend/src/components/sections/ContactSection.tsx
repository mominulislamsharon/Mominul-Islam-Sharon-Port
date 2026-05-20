"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSendMessageMutation } from "@/redux/features/messageApi";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const inViewOnce = { once: true, amount: 0.12 as const };

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await sendMessage(form).unwrap();
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="contact-section">
      <motion.p
        className="contact-section__label"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        contact
      </motion.p>
      <motion.h2
        className="contact-section__title"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        Let&apos;s Work Together
      </motion.h2>

      <motion.div
        className="contact-section__card"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        transition={{ delay: 0.08 }}
      >
        <div className="contact-section__glow" aria-hidden="true" />

        <h3 className="contact-section__card-title">Get In Touch</h3>
        <p className="contact-section__card-text">
          I&apos;m currently open to new opportunities. Drop me a message and
          I&apos;ll get back within 24 hours.
        </p>

        <form className="contact-section__form" onSubmit={handleSubmit}>
          <input
            className="contact-section__input"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="contact-section__input"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            className="contact-section__input contact-section__textarea"
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            className="contact-section__submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
