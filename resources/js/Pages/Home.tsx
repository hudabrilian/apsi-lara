import { Button } from "@/Components/ui/button";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Home({ auth }: PageProps) {
    return (
        <Layout user={auth.user}>
            <Head title="Home" />
            <main className="flex">
                <div className="flex flex-1 flex-col p-4">
                    <p className="font-bold mb-4 text-2xl">
                        Kegiatan Inspeksi K3 Bulanan Fakultas Teknik
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                        <div className="bg-indigo-500 h-52"></div>
                        <div className="bg-indigo-500 h-52"></div>
                        <div className="bg-indigo-500 h-52"></div>
                        <div className="bg-indigo-500 h-52"></div>
                        <div className="bg-indigo-500 h-52"></div>
                        <div className="bg-indigo-500 h-52"></div>
                    </div>
                </div>
                <div className="w-1/4 space-y-8">
                    <div className="p-4 bg-gray-300 text-center">
                        <div className="bg-black text-center text-white rounded-lg p-2">
                            <p className="text-sm font-bold">Laporan Insiden</p>
                        </div>
                        <p className="my-2 text-sm text-left">
                            Silahkan masukkan laporan insiden yang terjadi di
                            sekitar anda
                        </p>
                        <Link href={route("lapor.insiden")}>
                            <Button variant="secondary">LAPOR INSIDEN</Button>
                        </Link>
                    </div>
                    <div className="p-4 bg-gray-300 text-center">
                        <div className="bg-black text-center text-white rounded-lg p-2">
                            <p className="text-sm font-bold">
                                Laporan Potensi Bahaya
                            </p>
                        </div>
                        <p className="my-2 text-sm text-left">
                            Silahkan masukkan laporan potensi bahaya yang
                            terjadi di sekitar anda
                        </p>
                        <Link href={route("lapor.bahaya")}>
                            <Button variant="secondary">LAPOR BAHAYA</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
