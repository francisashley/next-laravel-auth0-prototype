import React, { useEffect, useState, useRef } from "react";
import Link from "./active-link";

function UserMenu({ user }) {
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
                    className="cursor-pointer pr-6 text-white flex items-center text-xs tracking-wide"
                    onClick={e => {
                        e.preventDefault();
                        setOpen(!open);
                    }}
                >
                    <img src={user.picture} className="mr-2 h-full" />
                    {user.name}
                </summary>

                <ul className="absolute bg-white rounded-sm right-0 text-sm mt-3 flex flex-col py-1 whitespace-no-wrap">
                    <li className="flex">
                        <Link href="/users/[id]" as={`/users/${user.name}`}>
                            <a
                                className="py-1 px-4 w-full hover:bg-yellow-400 text-xs pr-8 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                Your profile
                            </a>
                        </Link>
                    </li>
                    <li className="flex">
                        <a
                            href="/api/token"
                            className="py-1 px-4 w-full hover:bg-yellow-400 text-xs pr-8 font-medium"
                        >
                            Your tokens
                        </a>
                    </li>
                    <li className="flex">
                        <a
                            href="/api/logout"
                            className="py-1 px-4 w-full hover:bg-yellow-400 text-xs pr-8 font-medium"
                        >
                            Sign out
                        </a>
                    </li>
                </ul>
            </details>
            <Link href="/posts/new">
                <a className="text-white bg-blue-700 hover:bg-blue-800 block p-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                    >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </a>
            </Link>
            <style jsx>{`
                details:before {
                    content: "";
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 4px 4px 0 4px;
                    border-color: #ffffff transparent transparent transparent;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 8px;
                    pointer-events: none;
                }
                summary {
                    height: 28px;
                    background: rgba(0, 0, 0, 0.1);
                }
                summary:hover {
                    color: rgba(255, 255, 255, 0.6);
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
                img {
                    height: 28px;
                    width: 28px;
                    background: #4caf50;
                }
            `}</style>
        </div>
    );
}

export default UserMenu;
