import InputError from "@/Components/_Old/InputError";
import InputLabel from "@/Components/_Old/InputLabel";
import TextInput from "@/Components/_Old/TextInput";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import dateFormat from "dateformat";

export default function LaporInsiden({ auth }: PageProps) {
    const { data, setData, post, processing, errors, progress, reset } =
        useForm<{
            type: string;
            title: string;
            description: string;
            location: string;
            timeAt: string;
            file?: File;
        }>({
            type: "incident",
            title: "",
            description: "",
            location: "",
            timeAt: dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM"),
            file: undefined,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("lapor.submit"), {
            forceFormData: true,
        });
    };

    return (
        <Layout user={auth.user}>
            <Head title="Tentang Kami" />

            <main className="flex flex-col p-4">
                <p className="font-bold mb-4 text-2xl">
                    Data Pelaporan Insiden
                </p>

                <form onSubmit={submit} className="space-y-4">
                    <div className="flex space-x-6">
                        <div className="space-y-4 w-1/2">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />

                                <Input
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    autoFocus
                                    required
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <Input
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="location"
                                    value="Location"
                                />

                                <Input
                                    id="location"
                                    name="location"
                                    value={data.location}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.location}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="timeAt" value="Time" />

                                {/* <TextInput
                                    id="timeAt"
                                    name="timeAt"
                                    value={data.timeAt}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("timeAt", e.target.value)
                                    }
                                    required
                                /> */}

                                <Input
                                    id="timeAt"
                                    name="timeAt"
                                    value={data.timeAt}
                                    type="datetime-local"
                                    onChange={(e) =>
                                        setData("timeAt", e.target.value)
                                    }
                                    max={dateFormat(
                                        new Date(),
                                        "yyyy-mm-dd'T'HH:MM"
                                    )}
                                    required
                                />

                                <InputError
                                    message={errors.timeAt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col space-y-4">
                            {data.file && (
                                <div className="flex bg-white flex-col items-center justify-center p-4 rounded-lg border-2 w-1/2">
                                    <p>Preview file</p>
                                    <img
                                        src={URL.createObjectURL(data.file)}
                                        alt={data.title}
                                        className="max-h-fit"
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel htmlFor="file" value="File" />

                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("file", e.target.files![0])
                                    }
                                />

                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}

                                <InputError
                                    message={errors.timeAt}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full flex justify-center bg-indigo-700 hover:bg-indigo-800"
                        disabled={processing}
                    >
                        Submit
                    </Button>
                </form>
            </main>
        </Layout>
    );
}
