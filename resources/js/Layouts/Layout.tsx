import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/Components/ui/use-toast";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const { flash } = usePage<{ flash: { message: string } }>().props;
    const { toast } = useToast();

    useEffect(() => {
        if (flash.message) {
            toast({
                title: "Information",
                description: flash.message,
            });
        }
    }, []);

    return (
        <>
            <img
                src="/dekanat.jpg"
                className="bg-cover absolute -z-10 blur-sm opacity-20 overflow-hidden bg-center min-w-full max-h-screen min-h-screen flex items-center justify-center"
            />
            <Header user={user} />
            {children}
            <Footer />
            <Toaster />
        </>
    );
}
