"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
} from "convex/react";

import { Loading } from "@/components/auth/loading"

interface ConvexClientProviderProps {
    children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
    children,
}: ConvexClientProviderProps) => {
    return (
        <ClerkProvider
            localization={{
                socialButtonsBlockButton: "Продолжить с {{provider}}",
                dividerText: "или",
                formButtonPrimary: "Продолжить",
                signIn: {
                    start: {
                        title: "Вход в Boardy",
                        subtitle: "Добро пожаловать! Пожалуйста, войдите чтобы продолжить",
                        actionText: "У вас нет аккаунта?",
                        actionLink: "Зарегистрироваться",
                    },
                    emailLink: {
                        title: "Проверьте свою почту",
                        subtitle: "Нажмите на ссылку в письме чтобы войти",
                        resendButton: "Отправить письмо повторно",
                        verified: {
                            title: "Успешно!",
                            subtitle: "Вы будете перенаправлены через несколько секунд",
                        },
                    },
                },
                signUp: {
                    start: {
                        title: "Создайте аккаунт",
                        subtitle: "Чтобы продолжить работу с Boardy",
                        actionText: "Уже есть аккаунт?",
                        actionLink: "Войти",
                    },
                    emailLink: {
                        title: "Проверьте свою почту",
                        subtitle: "Нажмите на ссылку в письме чтобы завершить регистрацию",
                        resendButton: "Отправить письмо повторно",
                        verified: {
                            title: "Успешно!",
                            subtitle: "Вы будете перенаправлены через несколько секунд",
                        },
                    },
                },
                userProfile: {
                    title: "Профиль аккаунта",
                    subtitle: "Управление вашим профилем",
                    imageLabel: "Изображение профиля",
                    nameLabel: "Имя",
                    emailLabel: "Email",
                    signOutButton: "Выйти",
                },
                organizationProfile: {
                    title: "Профиль организации",
                    subtitle: "Управление организацией",
                    nameLabel: "Название организации",
                    imageLabel: "Логотип организации",
                    members: "Участники",
                    navigation: {
                        members: "Участники",
                        settings: "Настройки",
                    },
                },
                organizationSwitcher: {
                    personalWorkspace: "Личное пространство",
                    createOrganization: "Создать организацию",
                    invitationAcceptedOne: "Приглашение принято",
                    invitationAcceptedMultiple: "Приглашения приняты",
                },
                userButton: {
                    action: {
                        manageAccount: "Управление аккаунтом",
                        signOut: "Выйти",
                    },
                },
            }}
        >
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated>
                {children}
                </Authenticated>
                <AuthLoading>
                    <Loading />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};