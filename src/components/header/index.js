import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleClearStorage = () => {
    if (sessionStorage.token) {
      sessionStorage.removeItem("token");
    }
  };

  const loginLogout = () => {
    return sessionStorage.token ? (
      <>
        <Link class="nav-link" to="/new/article">
          Create
        </Link>
        <Link
          class="nav-link text-right"
          style={{ float: "right" }}
          onClick={handleClearStorage}
          to="/"
        >
          Logout
        </Link>
      </>
    ) : (
      <Link class="nav-link" to="/login">
        Login
      </Link>
    );
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="/favicon.ico"
          width="30"
          height="30"
          class="d-inline-block align-top m-1"
          alt=""
        />
        TRAVELLERS BLOG
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <Link class="nav-link active" href="#" to="/">
            Home <span class="sr-only">(current)</span>
          </Link>
          {loginLogout()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
