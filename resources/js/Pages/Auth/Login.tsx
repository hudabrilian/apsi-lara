import Checkbox from "@/Components/_Old/Checkbox";
import InputError from "@/Components/_Old/InputError";
import InputLabel from "@/Components/_Old/InputLabel";
import PrimaryButton from "@/Components/_Old/PrimaryButton";
import TextInput from "@/Components/_Old/TextInput";
import { Button } from "@/Components/ui/button";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <p className="text-red-700 font-bold text-2xl text-center">
                Login To Your Account
            </p>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="w-full flex justify-center bg-red-800 hover:bg-red-900"
                        disabled={processing}
                    >
                        Register
                    </Button>
                </div>
            </form>
            <p className="text-center text-red-800 text-sm">
                Not yet registered?{" "}
                <Link href={route("register")} className="font-bold">
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
