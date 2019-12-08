import React, { useEffect, useRef, useState } from "react";

import Link from "../app/active-link";

const UserDropdown = ({ authed }) => {
  const node = useRef();

  const [open, setOpen] = useState(false);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="user-menu flex">
      <details ref={node} className="relative" open={open}>
        <summary
          className="cursor-pointer pr-6 pl-3 flex items-center bg-white text-xs tracking-wide font-medium"
          onClick={e => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          {authed.name}
        </summary>

        <ul className="absolute bg-white rounded-sm right-0 text-sm mt-3 flex flex-col py-1 whitespace-no-wrap z-10 shadow">
          <li className="flex">
            <Link href="/users/[id]" as={`/users/${authed.name}`}>
              <a
                className="py-1 px-3 w-full hover:bg-gray-300 focus:bg-gray-300 text-xs pr-8 font-medium"
                onClick={() => setOpen(false)}
              >
                Your profile
              </a>
            </Link>
          </li>
          <li className="flex">
            <a
              href="/api/token"
              className="py-1 px-3 w-full hover:bg-gray-300 focus:bg-gray-300 text-xs pr-8 font-medium"
            >
              Your tokens
            </a>
          </li>
          <li className="flex">
            <a
              href="/api/logout"
              className="py-1 px-3 w-full hover:bg-gray-300 focus:bg-gray-300 text-xs pr-8 font-medium"
            >
              Sign out
            </a>
          </li>
        </ul>
      </details>

      <style jsx>{`
        details:before {
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 4px 0 4px;
          border-color: black transparent transparent transparent;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 8px;
          pointer-events: none;
        }
        summary {
          height: 28px;
        }
        summary:hover,
        summary:focus {
          background: rgba(255, 255, 255, 0.8);
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary + ul:before {
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 6px 6px 6px;
          border-color: transparent transparent #ffffff transparent;
          position: absolute;
          top: -6px;
          right: 22px;
        }
      `}</style>
    </div>
  );
};

export default UserDropdown;
