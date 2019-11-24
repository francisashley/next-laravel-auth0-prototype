import Link from "./ActiveLink";

function Header({ user, loading }) {
  return (
    <header className="app-header overflow-auto bg-gray-800">
      <nav className="max-w-3xl mx-auto my-6">
        <ul className="flex">
          <li className="mr-4">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="mr-4">
            <Link href="/articles">
              <a>Articles</a>
            </Link>
          </li>
          <li className="mr-auto">
            <Link href="/users">
              <a>Users</a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li className="mr-4">
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                <li className="mr-4">
                  <Link href="/ssr-profile">
                    <a>Profile (SSR)</a>
                  </Link>
                </li>
                <li className="mr-4">
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                </li>
                <li className="mr-4">
                  <a href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li className="mr-4">
                <a href="/api/login">Log in</a>
              </li>
            ))}
        </ul>
      </nav>
      <style jsx global>{`
        .app-header a {
          color: rgba(255, 255, 255, 0.6);
        }
        .app-header a:hover,
        .app-header .active {
          color: white;
        }
      `}</style>
    </header>
  );
}

export default Header;
