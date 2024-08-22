import Image from 'next/image';

export default function ContactDetails() {
  return (
    <div className="flex items-center justify-start bg-[#002134] py-2 px-2 text-xs text-[#E8E9ED]">
      <Image
        src="/MAP_LOGO.png"
        alt="Picture of the author"
        sizes="100vw"
        style={{
          width: '15%',
          height: 'auto',
        }}
        width={500}
        height={300}
      />

      <div className="flex flex-col pl-10 space-y-5">
        <h2 className="text-base font-semibold">Contact Details</h2>
        <h3>Phone: <a href='tel:+27786020598'>+27786020598</a></h3>
        <h3>Email: <a href="mailto:manando.autoparts@gmail.com">manando.autoparts@gmail.com</a></h3>
        <h3 className="text-center ">
          Address: 48 Piketberg PI, Lenasia South, 1835
        </h3>
      </div>
    </div>
  );
}
