import { List } from "./list";
import { NewButton } from "./new-button";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] left-0 bg-blue-950
        h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
            <Link href="/" className="block">
                <div className="w-full aspect-square relative flex items-center justify-center">
                    <Image 
                        src="/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        style={{ width: 'auto', height: 'auto' }}
                        priority
                    />
                </div>
            </Link>
            <List />
            <NewButton />
        </aside>
    );
};