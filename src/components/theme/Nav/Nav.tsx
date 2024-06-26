import React from 'react';

function Nav() {
  return (
    <nav className="fixed top-0 left-0  w-full bg-white z-10 shadow-md">
      <div className="py-4 px-6 flex justify-between items-center">
        <a href="." className="font-bold text-2xl">
          Innblikk
        </a>
      </div>
    </nav>
  );
}

export default Nav;
