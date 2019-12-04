import Link from "./active-link";
import UserMenu from "./user-menu";
import Logo from "./Logo";

function Header({ user }) {
    return (
        <header className="app-header py-4 flex items-center border-b-2 border-yellow-400">
            <Logo />
            <nav className="app-nav">
                <ul className="flex items-center">
                    <li className="mr-4 text-sm font-medium tracking-wide">
                        <Link href="/" children={<a>Home</a>} />
                    </li>
                    <li className="mr-4 text-sm font-medium tracking-wide">
                        <Link href="/posts" children={<a>Posts</a>} />
                    </li>
                    <li className="mr-4 text-sm font-medium tracking-wide">
                        <Link href="/users" children={<a>Users</a>} />
                    </li>
                    {user && (
                        <li>
                            <UserMenu user={user} />
                        </li>
                    )}
                    {!user && (
                        <li className="text-sm font-medium tracking-wide">
                            <a href="/api/login">Log in</a>
                        </li>
                    )}
                </ul>
            </nav>
            <style jsx>{`
                a {
                    color: white;
                }
                a:hover,
                a:focus {
                    color: rgba(255, 255, 255, 0.6);
                }
                a.active {
                    color: #f6e05e;
                }
            `}</style>
        </header>
    );
}

export default Header;
