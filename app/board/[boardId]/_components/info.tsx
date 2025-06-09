"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface InfoProps {
    boardId: string;
};

export const Info = ({
    boardId,
}: InfoProps) => {
    const [isReady, setIsReady] = useState(false);
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Link href="/">
                <div className="flex items-center gap-x-2 mr-2 p-2 hover:bg-slate-100 rounded-md transition">
                    <Image 
                        src="/logo.svg"
                        alt="Logo"
                        height={40}
                        width={40}
                        className="dark:hidden"
                        style={{ width: 'auto', height: 'auto' }}
                        priority
                    />
                    <span className={`hidden sm:block text-sm font-semibold ${font.className}`}>
                        На главную
                    </span>
                </div>
            </Link>
            <Separator className="h-8" orientation="vertical" />
            <div 
                className="flex items-center gap-x-2 px-2 hover:bg-slate-100 rounded-md transition"
                onClick={() => onOpen(boardId, data?.title || "Untitled")}
                role="button"
                style={{ cursor: "pointer" }}
            >
                <span className="text-sm font-medium">
                    {data?.title || "Untitled"}
                </span>
            </div>
            <Actions
                id={boardId}
                title={data?.title || "Untitled"}
                side="bottom"
                sideOffset={10}
            >
                <Button
                    variant="board"
                    size="sm"
                    className="text-sm h-auto p-2"
                >
                    <Menu className="h-4 w-4" />
                </Button>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    );
};