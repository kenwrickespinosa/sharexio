import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between border p-6 md:px-32 md:py-8">
      <span>Sharexio</span>
      <nav>
        <Link to="/auth/login" className="border px-4 py-2 rounded-md">
          Log In
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
