import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import dateFormat from "dateformat";

export default function DataInsiden({
    auth,
    type,
    reports,
}: PageProps<{
    type: string;
    reports: {
        timeAt: string;
        title: string;
        description: string;
        location: string;
        files: {
            id: string;
            file: string;
        }[];
    }[];
}>) {
    console.log(reports);
    return (
        <Layout user={auth.user}>
            <Head title={`Data ${type}`} />

            <main className="p-4">
                <p className="font-bold mb-4 text-2xl">Data Pelaporan {type}</p>

                <div className="bg-white rounded-lg p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Waktu
                                </TableHead>
                                <TableHead>Insiden</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {dateFormat(report.timeAt, "default")}
                                    </TableCell>
                                    <TableCell>{report.title}</TableCell>
                                    <TableCell>{report.description}</TableCell>
                                    <TableCell>{report.location}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    disabled={
                                                        report.files.length < 1
                                                    }
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Foto Kejadian
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        {report.files.map(
                                                            (file) => (
                                                                <img
                                                                    key={
                                                                        file.id
                                                                    }
                                                                    src={
                                                                        file.file
                                                                    }
                                                                    alt={
                                                                        report.title
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {reports.length < 1 && (
                            <TableCaption className="font-bold text-2xl p-4">
                                Tidak ada data
                            </TableCaption>
                        )}
                    </Table>
                </div>
            </main>
        </Layout>
    );
}
