"use client";

import { Children, ReactNode, useEffect, useState, useCallback } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveblocksProvider, useRoom } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface RoomProps {
    children: ReactNode
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
};

const LIVEBLOCKS_PUBLIC_KEY = "pk_dev_4_39Tcvs6NvyQoAYeK3TYxwxJX4jk6i9TnXMkm42OCWQgGz2zI-S1a-NI7J-3rom";

const RoomContent = ({ children, fallback, roomId }: { children: ReactNode, fallback: NonNullable<ReactNode> | null, roomId: string }) => {
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
    const [connectionError, setConnectionError] = useState<Error | null>(null);
    const room = useRoom();

    useEffect(() => {
        let mounted = true;

        const initializeRoom = async () => {
            try {
                if (!room) {
                    console.log("Комната не инициализирована");
                    return;
                }

                // Ждем подключения к комнате и инициализации хранилища
                await room.getStorage();
                
                if (!mounted) return;
                
                console.log("Комната инициализирована:", roomId);
                setIsStorageLoaded(true);
            } catch (error) {
                console.error("Ошибка при инициализации комнаты:", error);
                if (mounted) {
                    setConnectionError(error as Error);
                }
            }
        };

        initializeRoom();

        return () => {
            mounted = false;
        };
    }, [room, roomId]);

    if (connectionError) {
        console.error("Ошибка подключения к комнате:", connectionError);
        return fallback;
    }

    if (!isStorageLoaded) {
        console.log("Ожидание загрузки хранилища для комнаты:", roomId);
        return fallback;
    }

    console.log("Рендеринг содержимого комнаты:", roomId);
    return <>{children}</>;
};

export const Room = ({
    children,
    roomId,
    fallback,
}: RoomProps) => {
    const { user, isLoaded: isUserLoaded } = useUser();
    const router = useRouter();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!isUserLoaded) {
            console.log("Ожидание загрузки пользователя...");
            return;
        }

        if (!user) {
            console.log("Пользователь не авторизован, перенаправление...");
            router.push("/");
            return;
        }

        if (!roomId || roomId === 'logo.svg' || roomId.includes('.')) {
            console.error("Невалидный ID комнаты:", roomId);
            router.push("/");
            return;
        }

        const handleError = (error: any) => {
            if (error.type === 'error' && error.target instanceof HTMLImageElement) {
                // Игнорируем ошибки загрузки изображений
                return;
            }

            console.error("Ошибка в комнате:", error);
            setError(error);
            
            if (error.message === "Room not found" || 
                error.message === "Unauthorized" ||
                error.message?.includes("cannot be used until") ||
                error.message?.includes("This mutation cannot be used")) {
                console.log("Перенаправление на главную из-за ошибки");
                router.push("/");
            }
        };

        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", (event) => handleError(event.reason));

        return () => {
            window.removeEventListener("error", handleError);
            window.removeEventListener("unhandledrejection", (event) => handleError(event.reason));
        };
    }, [router, roomId, user, isUserLoaded]);

    if (!isUserLoaded || !user) {
        console.log("Ожидание готовности пользователя...");
        return fallback;
    }

    if (error) {
        console.log("Отображение fallback из-за ошибки:", error);
        return fallback;
    }

    const presence = {
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
    };

    const storage = {
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
    };

    const userInfo = {
        name: user.firstName || user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
    };

    return (
        <LiveblocksProvider publicApiKey={LIVEBLOCKS_PUBLIC_KEY}>
            <RoomProvider 
                id={roomId}
                initialPresence={presence}
                initialStorage={storage}
                initialUserInfo={userInfo}
            >
                <ClientSideSuspense fallback={fallback}>
                    {() => (
                        <RoomContent 
                            fallback={fallback}
                            roomId={roomId}
                        >
                            {children}
                        </RoomContent>
                    )}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};