import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/elements.svg"
                height={300}
                width={300}
                alt="Not Found"
                style={{ width: 'auto', height: 'auto' }}
                priority
            />
            <h2 className="text-xl font-medium">
                Доска была удалена
            </h2>
            <Button asChild>
                <Link href="/">
                    Вернуться на главную
                </Link>
            </Button>
        </div>
    );
} 