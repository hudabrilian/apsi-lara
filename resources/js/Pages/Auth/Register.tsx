import Checkbox from "@/Components/_Old/Checkbox";
import InputError from "@/Components/_Old/InputError";
import InputLabel from "@/Components/_Old/InputLabel";
import PrimaryButton from "@/Components/_Old/PrimaryButton";
import TextInput from "@/Components/_Old/TextInput";
import { Button } from "@/Components/ui/button";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <p className="text-red-700 font-bold text-2xl text-center">
                Create New Account
            </p>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <Button
                        className="w-full flex justify-center bg-red-800 hover:bg-red-900"
                        disabled={processing}
                    >
                        Register
                    </Button>
                </div>
            </form>
            <p className="text-center text-red-800 text-sm">
                Already registered?{" "}
                <Link href={route("login")} className="font-bold">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}
