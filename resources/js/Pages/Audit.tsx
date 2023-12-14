import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Audit({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Sertifikasi K3" />

            <main className="flex flex-col p-4">
                <p className="font-bold mb-4 text-2xl">Protected: Audit K3</p>
                <p>
                    This content is password protected. To view it please enter
                    your password below:
                </p>
                <div className="flex space-x-2">
                    <Input className="max-w-xs" placeholder="Password..." />
                    <Button>Enter</Button>
                </div>
            </main>
        </Layout>
    );
}
