import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
import { PageProps, User } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

export default function Header({ user }: { user: User }) {
    const { toast } = useToast();

    return (
        <div>
            <div className="flex bg-teal-500 p-4 justify-between">
                <div className="flex">
                    <img src="/logo-undip.png" className="w-20" />
                    <div className="ml-4 text-white flex flex-col justify-between">
                        <p className="text-5xl font-bold -ml-1">K3 FT UNDIP</p>
                        <div>
                            <p className="text-xs">
                                UNIT KESELAMATAN DAN KESEHATAN KERJA FAKULTAS
                                TEKNIK
                            </p>
                            <p className="text-xs">UNIVERSITAS DIPONEGORO</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end text-white">
                    <div className="flex space-x-4">
                        <p className="text-sm">024 - 7460053</p>
                        <p className="text-sm">http://ft.undip.ac.id</p>
                    </div>
                    <div>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button>Hi, {user.name}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuLabel className="text-xs text-gray-600">
                                        {user.email}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={route("profile.edit")}>
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            Log Out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href={route("login")}>
                                <Button variant="secondary">LOGIN</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between font-bold text-xs tracking-widest text-white bg-indigo-800 p-3 uppercase">
                <div className="">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-indigo-800"
                                    )}
                                    asChild
                                >
                                    <Link href={route("home")}>Beranda</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-indigo-800"
                                    )}
                                    asChild
                                >
                                    <Link href={route("about")}>
                                        Tentang kami
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-indigo-800"
                                    )}
                                    asChild
                                >
                                    <Link href={route("document")}>
                                        Dokumen
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-indigo-800"
                                    )}
                                    asChild
                                >
                                    <Link href={route("sertifikasi.k3")}>
                                        Sertifikasi K3
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-indigo-800"
                                    )}
                                    asChild
                                >
                                    <Link href={route("audit.k3")}>Audit</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-indigo-800 uppercase">
                                    Pelaporan
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="absolute justify-end">
                                    <div className="p-2 space-y-4 w-[633px]">
                                        <div className="">
                                            <Link
                                                href={route("data.insiden")}
                                                className="px-4 rounded-lg py-2 block select-none no-underline outline-none transition-colors hover:bg-gray-200"
                                            >
                                                Data pelaporan insiden
                                            </Link>
                                            <Link
                                                href={route("data.bahaya")}
                                                className="px-4 rounded-lg py-2 block select-none no-underline outline-none transition-colors hover:bg-gray-200"
                                            >
                                                Data pelaporan bahaya
                                            </Link>
                                            <Link
                                                href={route("data.kegiatan")}
                                                className="px-4 rounded-lg py-2 block select-none no-underline outline-none transition-colors hover:bg-gray-200"
                                            >
                                                Data pelaporan kegiatan
                                            </Link>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
