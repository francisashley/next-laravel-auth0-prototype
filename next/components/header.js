import Link from "./active-link";
import UserMenu from "./user-menu";
import Logo from "./Logo";

function Header({ authed }) {
  return (
    <header className="app-header py-4 flex items-center border-b-2 border-yellow-400">
      <Logo />
      <nav className="app-nav">
        <ul className="app-nav-link flex items-center">
          <li className="app-nav-link mr-4 text-sm font-medium tracking-wide">
            <Link href="/" children={<a>Home</a>} />
          </li>
          <li className="app-nav-link mr-4 text-sm font-medium tracking-wide">
            <Link href="/posts" children={<a>Posts</a>} />
          </li>
          <li className="app-nav-link mr-4 text-sm font-medium tracking-wide">
            <Link href="/users" children={<a>Users</a>} />
          </li>
          {authed && (
            <li className="mr-2">
              <Link href="/posts/new">
                <a className="text-white bg-blue-700 hover:bg-blue-800 block py-1 px-2 text-xs font-medium tracking-wide">
                  Create Post
                </a>
              </Link>
            </li>
          )}
          {authed && (
            <li>
              <UserMenu authed={authed} />
            </li>
          )}
          {!authed && (
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
        .app-nav-link a.active {
          color: #f6e05e;
        }
      `}</style>
    </header>
  );
}

export default Header;
