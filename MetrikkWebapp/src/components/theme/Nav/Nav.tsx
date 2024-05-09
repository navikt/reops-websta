import React from 'react';

function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
      <div className="py-5 px-4 flex justify-between items-center">
        <a href="." className="font-bold text-xl">
          Websta
        </a>
      </div>
    </nav>
  );
}

export default Nav;
