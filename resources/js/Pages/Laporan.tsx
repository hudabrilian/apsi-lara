import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import dateFormat from "dateformat";

export default function Report({
    auth,
    report,
}: PageProps<{
    report: {
        id: string;
        timeAt: string;
        title: string;
        description: string;
        location: string;
        keterangan: string;
        files: {
            id: string;
            file: string;
        }[];
    };
}>) {
    return (
        <Layout user={auth.user}>
            <Head title="Informasi laporan" />

            <main className="p-4">
                <p className="font-bold mb-4 text-2xl">
                    Laporan {report.title}
                </p>
                <div className="flex flex-col space-y-4 divide-y bg-white rounded-lg p-4">
                    <div className="pt-2">
                        <p className="font-bold text-xl">Deskripsi</p>
                        <p>{report.description}</p>
                    </div>
                    <div className="pt-2">
                        <p className="font-bold text-xl">Lokasi</p>
                        <p>{report.location}</p>
                    </div>
                    <div className="pt-2">
                        <p className="font-bold text-xl">Waktu kejadian</p>
                        <p>{dateFormat(report.timeAt, "default")}</p>
                    </div>
                    <div className="pt-2">
                        <p className="font-bold text-xl">Foto kejadian</p>
                        {report.files.map((file) => (
                            <img
                                key={file.id}
                                src={file.file}
                                alt={report.title}
                                className="max-h-56"
                            />
                        ))}
                    </div>
                    <div className="pt-2">
                        <p className="font-bold text-xl">Keterangan</p>
                        <p>{report.keterangan || "-"}</p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
