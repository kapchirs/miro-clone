"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Error() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/error.svg"
                height={300}
                width={300}
                alt="Error"
                className="dark:hidden"
                style={{ width: 'auto', height: 'auto' }}
                priority
            />
            <h2 className="text-xl font-medium">
                Что-то пошло не так!
            </h2>
            <Button asChild>
                <Link href="/">
                    Вернуться на главную
                </Link>
            </Button>
        </div>
    );
} 