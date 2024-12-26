"use client";

import { Children, ReactNode } from "react";
//import { RoomProvider } from "@/liveblocks.config";
import { RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveblocksProvider } from "@liveblocks/react";
interface RoomProps {
    children: ReactNode
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
};

export const Room = ({
    children,
    roomId,
    fallback,
}: RoomProps) => {
    return (
        <LiveblocksProvider publicApiKey="pk_dev_4_39Tcvs6NvyQoAYeK3TYxwxJX4jk6i9TnXMkm42OCWQgGz2zI-S1a-NI7J-3rom">
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={fallback}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};