import Link from 'next/link';

const TopNav = () => {
    return (
        <div className="border-b border-neutral-500 bg-neutral-900 fixed w-full h-14 z-10">
            <div className="max-w-screen-md mx-auto flex justify-evenly px-1 py-2">
                <div />
                <div>
                    <Link href="/">
                        <a className="text-3xl font-semibold">musicdle</a>
                    </Link>
                </div>
                <div />
            </div>
        </div>
    );
};

export default TopNav;
