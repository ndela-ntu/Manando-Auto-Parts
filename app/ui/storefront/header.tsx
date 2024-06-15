import AcmeLogo from '../acme-logo';
import Navbar from './nav-bar';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 w-full bg-blue flex flex-row items-center justify-between space-y-5 bg-blue-600 p-5 py-2 text-white z-10">
      <AcmeLogo />
      <Navbar/>
    </header>
  );
}
