"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import toast from "react-hot-toast";
import { useSendMessageMutation } from "@/redux/features/messageApi";
import { FiMail, FiUser, FiMessageSquare, FiSend, FiMapPin, FiGithub, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
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

        <div className="contact-section__inner">
          {/* Left Side: Contact Info */}
          <div className="contact-section__info">
            <h3 className="contact-section__card-title">Get In Touch</h3>
            <p className="contact-section__card-text">
              I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi,
              I&apos;ll try my best to get back to you within 24 hours.
            </p>

            <div className="contact-section__details">
              <div className="contact-section__detail-item">
                <div className="contact-section__icon-wrap">
                  <FiMail className="contact-section__detail-icon" />
                </div>
                <div>
                  <p className="contact-section__detail-label">Email</p>
                  <a href="mailto:mominulislamsharon@gmail.com" className="contact-section__detail-value">
                    mominulislamsharon@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-section__detail-item">
                <div className="contact-section__icon-wrap">
                  <FiMapPin className="contact-section__detail-icon" />
                </div>
                <div>
                  <p className="contact-section__detail-label">Location</p>
                  <p className="contact-section__detail-value">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="contact-section__socials">
              <a href="https://github.com/mominulislamsharon" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/mominulislamsharon" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://www.facebook.com/mominulislamsharon1" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/mominul_islam_sharon/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form className="contact-section__form" onSubmit={handleSubmit}>
            <div className="contact-section__input-group">
              <FiUser className="contact-section__input-icon" />
              <input
                className="contact-section__input contact-section__input--with-icon"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            
            <div className="contact-section__input-group">
              <FiMail className="contact-section__input-icon" />
              <input
                className="contact-section__input contact-section__input--with-icon"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            
            <div className="contact-section__input-group">
              <FiMessageSquare className="contact-section__input-icon contact-section__input-icon--textarea" />
              <textarea
                className="contact-section__input contact-section__textarea contact-section__input--with-icon"
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            
            <button
              type="submit"
              className="contact-section__submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : (
                <>
                  Send Message <FiSend className="contact-section__submit-icon" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
