import { Button } from "@/Components/ui/button";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";

export default function Document({
    auth,
    documents,
}: PageProps<{
    documents: {
        id: number;
        title: string;
        description: string;
        file: string;
    }[];
}>) {
    const { data, post, setData } = useForm({
        q: "",
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("document.search"), {
            data: {
                q: data.q,
            },
        });
    };

    return (
        <Layout user={auth.user}>
            <Head title="Berkas" />

            <main className="p-4">
                <div className="flex justify-between">
                    <p className="font-bold mb-4 text-2xl">
                        Dokumen Kebutuhan K3 FT UNDIP
                    </p>

                    <div className="flex space-x-4">
                        {auth.user.role === "staff" && (
                            <Link href={route("tambah.dokumen")}>
                                <Button>Tambah berkas</Button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-col space-y-4 divide-y bg-white rounded-lg p-4">
                    <div className="w-full max-w-xs">
                        <form onSubmit={handleSearch}>
                            <Input
                                id="search"
                                name="q"
                                type="text"
                                placeholder="Cari berkas"
                                className="mt-1 block w-full"
                                onChange={(e) => setData("q", e.target.value)}
                                value={data.q}
                            />
                        </form>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Nama
                                </TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((document) => (
                                <TableRow key={document.id}>
                                    <TableCell className="font-medium">
                                        {document.title}
                                    </TableCell>
                                    <TableCell>
                                        {document.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <a href={document.file}>
                                            <Button>Lihat File</Button>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </Layout>
    );
}
