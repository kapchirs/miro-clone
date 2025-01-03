"use client";

import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRenameModal } from "@/store/use-rename-modal";


interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
            .then(() => toast.success("Cсылка скопирована в буфер обмена"))
            .catch(() => toast.error("Произошла ошибка при копировании"))
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Доска удалена"))
            .catch(() => toast.error("Не получилось удалить доску"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w=60"
            >
                <DropdownMenuItem
                    onClick={onCopyLink} 
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Скопировать ссылку
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onOpen(id, title)} 
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Изменить название
                </DropdownMenuItem>
                <ConfirmModal
                    header="Удалить доску?"
                    description="Удалив, вы потяряете все данные на доске"
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                        //onClick={onDelete}
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Удалить доску
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};