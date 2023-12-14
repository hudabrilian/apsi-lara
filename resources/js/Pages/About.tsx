import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function About({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Tentang Kami" />

            <main className="flex flex-col p-4 justify-center items-center space-y-4 bg-white">
                <p className="font-bold mb-4 text-2xl">
                    Profil K3 Fakultas Teknik
                </p>
                <img src="/dekanat.jpg" className="max-w-xl" />
                <div className="max-w-5xl text-justify">
                    <p className="font-bold">Tugas Pokok</p>
                    <ol>
                        <li>
                            1. Merupakan unit pengelola / manajemen risiko
                            Keselamatan, Kesehatan Kerja di Fakultas Teknik
                            Universitas Diponegoro dengan pendekatan Sistem
                            Manajemen K3.
                        </li>
                        <li>
                            2. Mengelola kondisi darurat dan krisis yang mungkin
                            terjadi di Fakultas Teknik Universitas Diponegoro.
                        </li>
                        <li>
                            3. Memberikan dukungan dan saran bagi kegiatan
                            belajar mengajar, riset, kegiatan laboratorium,
                            bengkel agar berlangsung secara selamat dan sehat.
                        </li>
                    </ol>
                </div>
            </main>
        </Layout>
    );
}
