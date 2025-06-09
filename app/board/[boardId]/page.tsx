import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const LoadingWrapper = () => (
    <div className="h-full w-full flex items-center justify-center">
        <Loading />
    </div>
);

const BoardIdPage = async ({
    params,
}: BoardIdPageProps) => {
    // Проверяем и получаем параметры
    const resolvedParams = await Promise.resolve(params);
    const boardId = resolvedParams.boardId;

    // Проверяем валидность ID
    if (!boardId || boardId === 'logo.svg' || boardId.includes('.')) {
        console.log("Невалидный ID доски:", boardId);
        return redirect("/");
    }

    try {
        // Пытаемся загрузить доску
        console.log("Загрузка доски с ID:", boardId);
        const board = await convex.query(api.board.get, { id: boardId });
        
        if (!board) {
            console.log("Доска не найдена:", boardId);
            return notFound();
        }

        console.log("Доска успешно загружена:", boardId);

        // Рендерим компоненты с загруженной доской
        return (
            <main className="h-full w-full relative bg-neutral-100 touch-none">
                <Suspense fallback={<LoadingWrapper />}>
                    <Room 
                        roomId={boardId} 
                        fallback={<LoadingWrapper />}
                    >
                        <Canvas boardId={boardId} />
                    </Room>
                </Suspense>
            </main>
        );
    } catch (error: any) {
        console.error("Ошибка при загрузке доски:", error?.message || error);
        if (error?.message?.includes("Value does not match validator")) {
            console.log("Неверный формат ID доски");
            return redirect("/");
        }
        return redirect("/");
    }
};

export default BoardIdPage;
