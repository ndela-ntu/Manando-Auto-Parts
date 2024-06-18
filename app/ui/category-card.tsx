import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({
  name,
  imageSRC,
}: {
  name: string;
  imageSRC: string;
}) {
  return (
    <div className="card card-compact w-[100%] bg-base-100 shadow-xl bg-[#E8E9ED]">
      <div className="card-body">
        <Link href={`/storefront?filterBy=${name.split(' ').join('_')}`}>
          <Image
            src={imageSRC}
            alt="Picture of car part"
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
          <h2 className="card-title py-2.5">{name}</h2>
        </Link>
      </div>
    </div>
  );
}
