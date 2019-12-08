import Link from "next/link";

const Title = () => {
  return (
    <h2 className="text-2xl mr-auto tracking-wide text-white">
      <Link href="/">
        <a>NLAP</a>
      </Link>

      <style jsx>{`
        a:hover,
        a:focus {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </h2>
  );
};

export default Title;
