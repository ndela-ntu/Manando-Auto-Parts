import AcmeLogo from '../acme-logo';
import Navbar from './nav-bar';

export default function Header({ withoutCart }: { withoutCart: boolean }) {
  return (
    <header className="bg-blue flex flex-row items-center justify-between space-y-5 bg-blue-600 p-5 py-2 text-white">
      <AcmeLogo />
      <Navbar withoutCart={withoutCart} />
    </header>
  );
}
