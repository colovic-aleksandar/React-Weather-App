import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p>
        Hi! I'm Aleksandar Čolović, a Frontend developer passionate about building
        clean and functional web applications. If you want to connect or check
        out my projects, feel free to reach me through the links below.
      </p>

      <div className="contact-icons">
        <a
          href="https://www.linkedin.com/in/aleksandarcolovic/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/colovic-aleksandar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:colovicc998@gmail.com"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
}

export default Contact;