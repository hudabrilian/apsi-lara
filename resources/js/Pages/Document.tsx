import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Document({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Berkas" />

            <p>Berkas</p>
        </Layout>
    );
}
