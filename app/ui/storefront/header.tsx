import AcmeLogo from '../acme-logo';
import Navbar from './nav-bar';

export default function Header() {
  return (
    <header className="bg-blue flex items-center justify-between bg-blue-600 p-5 py-2 text-white">
      <AcmeLogo />
      <Navbar />
    </header>
  );
}
