import AddNewPostButton from "./add-new-post";
import AppTitle from "./title";
import Link from "../app/active-link";
import UserDropdown from "./user-dropdown";
import classnames from "classnames";

const Header = ({ authed, className }) => {
  return (
    <header
      className={classnames(
        "app-header py-4 flex items-center border-b-2 border-yellow-400 mb-8",
        className
      )}
    >
      <AppTitle />
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
              <AddNewPostButton href="/posts/new">Add New Post</AddNewPostButton>
            </li>
          )}
          {authed && (
            <li>
              <UserDropdown authed={authed} />
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
          color: rgba(255, 255, 255, 0.8);
        }
        .app-nav-link a.active {
          color: #f6e05e;
        }
      `}</style>
    </header>
  );
};

export default Header;
