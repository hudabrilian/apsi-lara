import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <img
                src="/dekanat.jpg"
                className="bg-cover absolute -z-10 blur-sm overflow-hidden bg-center min-w-full max-h-screen min-h-screen flex items-center justify-center"
            />
            <div className="flex flex-col-reverse mt-20 lg:mt-0 lg:flex-row justify-end lg:justify-start lg:items-center lg:h-screen lg:ml-28 xl:ml-32">
                <div className="bg-white rounded-xl p-8 mt-8 lg:mt-0">
                    <div className="flex flex-col space-y-4 px-4">
                        {children}
                    </div>
                </div>
                <div className="flex flex-col lg:translate-y-36 ml-10 text-white font-bold text-7xl">
                    <div className="static">
                        <p className="absolute -translate-y-1 translate-x-1 -z-10 text-gray-300">
                            LOGIN
                        </p>
                        <p className="inline-block">LOGIN</p>
                    </div>
                    <div className="static">
                        <p className="absolute -translate-y-1 translate-x-1 -z-10 text-gray-300">
                            K3 FT UNDIP
                        </p>
                        <p className="inline-block">K3 FT UNDIP</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
