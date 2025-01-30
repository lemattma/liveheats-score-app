import { FireIcon } from '@heroicons/react/24/solid';

function Logo() {
  return (
    <div id="logo">
      <span className="text-2xl flex gap-2 items-center font-semibold text-lh-red">
        <FireIcon className="w-6 h-6" />
        Live Placar
      </span>
    </div>
  );
}

function Header() {
  return (
    <div className="py-6">
      <div className="container mx-auto">
        <div className="flex items-end gap-6">
          <Logo />
          <nav className="grow text-lg leading-7">
            <ul>
              <li>
                <a href="/scores">My Scores</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
