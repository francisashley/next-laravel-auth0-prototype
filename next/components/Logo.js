import Link from "next/link";

function Logo() {
    return (
        <h2 className="text-2xl mr-auto tracking-wide text-white">
            <Link href="/" children={<a>NLAP</a>} />
            <style jsx>{`
                a {
                    color: white;
                }
                a:hover,
                a:focus {
                    color: rgba(255, 255, 255, 0.6);
                }
            `}</style>
        </h2>
    );
}

export default Logo;
