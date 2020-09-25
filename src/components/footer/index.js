import React from "react";
import Style from "./Footer.module.css";

const Footer = () => (
  <footer className={Style.footer}>
    <ul>
      <li>
        <a
          href="https://github.com/Tej-Chavali"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
