"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";


export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const mutate = useMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Доска создана");
                router.push(`/board/${id}`);
            })
            .catch(() => toast.error("Не получилось создать доску"));
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/note.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Создай свою первую доску!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Стань создателем доски для твоей организации
            </p>
            <div className="mt-6">
                <Button onClick={onClick} size="lg">
                    Создать доску
                </Button>
            </div>
        </div>
    );
};