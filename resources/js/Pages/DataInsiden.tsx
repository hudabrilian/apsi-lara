import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import {
    EyeIcon,
    InformationCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import dateFormat from "dateformat";

export default function DataInsiden({
    auth,
    type,
    reports,
}: PageProps<{
    type: string;
    reports: {
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
    }[];
}>) {
    return (
        <Layout user={auth.user}>
            <Head title={`Data ${type}`} />

            <main className="p-4">
                <div className="flex justify-between">
                    <p className="font-bold mb-4 text-2xl">
                        Data Pelaporan {type}
                    </p>
                    {route().current("data.kegiatan") &&
                        auth.user &&
                        auth.user.role === "staff" && (
                            <Link href={route("lapor.kegiatan")}>
                                <Button>Update Kegiatan</Button>
                            </Link>
                        )}
                </div>

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
                                <TableHead>Keterangan</TableHead>
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
                                    <TableCell>
                                        {report.keterangan || "-"}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link
                                                        href={route(
                                                            "data.informasi",
                                                            {
                                                                id: report.id,
                                                            }
                                                        )}
                                                    >
                                                        <Button>
                                                            <InformationCircleIcon className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Cek lebih lanjut</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <Dialog>
                                            <DialogTrigger>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger
                                                            disabled={
                                                                report.files
                                                                    .length < 1
                                                            }
                                                        >
                                                            <Button
                                                                disabled={
                                                                    report.files
                                                                        .length <
                                                                    1
                                                                }
                                                            >
                                                                <EyeIcon className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                Cek foto
                                                                kejadian
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
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

                                        {auth.user &&
                                            auth.user.role === "staff" && (
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <Button>
                                                                        <TrashIcon className="w-4 h-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
                                                                        Hapus
                                                                        laporan
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Are you sure
                                                                absolutely sure?
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                This action
                                                                cannot be
                                                                undone. Are you
                                                                sure you want to
                                                                permanently
                                                                delete this file
                                                                from our
                                                                servers?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button>
                                                                <Link
                                                                    href={route(
                                                                        "lapor.delete",
                                                                        {
                                                                            id: report.id,
                                                                        }
                                                                    )}
                                                                    method="delete"
                                                                    as="button"
                                                                >
                                                                    Confirm
                                                                </Link>
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
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
