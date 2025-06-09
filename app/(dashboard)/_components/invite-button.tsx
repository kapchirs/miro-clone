import { Plus } from "lucide-react";
import { CreateOrganization, OrganizationList, OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Organization, OrganizationInvitation, OrganizationMembership, OrganizationMembershipPublicUserData } from "@clerk/nextjs/server";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Создать организацию
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <DialogTitle>
                    <VisuallyHidden>Создание организации</VisuallyHidden>
                </DialogTitle>
                <DialogDescription>
                    <VisuallyHidden>Форма создания новой организации</VisuallyHidden>
                </DialogDescription>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};