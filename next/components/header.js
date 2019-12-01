import Link from "./active-link";

function Header({ user }) {
    return (
        <header className="app-header overflow-auto bg-gray-800">
            <nav className="max-w-3xl mx-auto py-4 flex items-center border-b-2 border-yellow-400">
                <h2 className="text-2xl mr-auto tracking-wide text-white">
                    <Link href="/">
                        <a>NLAP</a>
                    </Link>
                </h2>
                <ul className="flex">
                    <li className="mr-4">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/posts">
                            <a>Posts</a>
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/users">
                            <a>Users</a>
                        </Link>
                    </li>
                    <li className="mr-4">
                        <a href="/api/token">Tokens</a>
                    </li>
                    {user && (
                        <li className="mr-4">
                            <Link href="/users/[id]" as={`/users/${user.name}`}>
                                <a>Profile</a>
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li>
                            <a href="/api/logout">Logout</a>
                        </li>
                    )}
                    {!user && (
                        <li>
                            <a href="/api/login">Log in</a>
                        </li>
                    )}
                </ul>
            </nav>
            <style jsx global>{`
                .app-header ul a {
                    color: rgba(255, 255, 255, 0.6);
                }
                .app-header ul a:hover,
                .app-header ul a:focus {
                    color: white;
                }
                .app-header ul .active {
                    color: #f6e05e;
                }
            `}</style>
        </header>
    );
}

export default Header;
