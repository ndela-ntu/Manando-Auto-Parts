import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Link from 'next/link';

export default function AcmeLogo() {
  return (
    <Link href="/">
      <div className={`${lusitana.className}`}>
        <Image
          src="/MAP_LOGO.png"
          alt="Picture of the author"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={300}
        />
      </div>
    </Link>
  );
}
