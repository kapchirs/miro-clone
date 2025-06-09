//"use client";

import { Loader } from "lucide-react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
    return (
        <main
            className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center"
        >
            <div className="relative w-[120px] h-[120px]">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={120}
                    height={120}
                    className="animate-pulse duration-700"
                    priority
                />
            </div>
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    );
};