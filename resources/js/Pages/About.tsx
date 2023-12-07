import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function About({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Tentang Kami" />

            <p>About us</p>
        </Layout>
    );
}
