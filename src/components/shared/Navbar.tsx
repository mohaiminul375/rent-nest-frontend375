'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CiMenuFries } from "react-icons/ci";
import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';
import { logout } from '@/service/logout';
import { toast } from 'sonner';


const navItems = [
    {
        title: 'Home',
        path: '/',
        type: 'public',

    },
    {
        title: 'Properties',
        path: '/properties',
        type: 'public',
    },
];

type IUser = {
    success: boolean,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        phone: string,
        role: string,
        status: string,
        address: string,
        updatedAt: string,
        createdAt: string,
    }
}
type NavbarProps = {
    user: IUser
}


const Navbar = ({ user }: NavbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = async () => {
        toast.success('Logout Successfully')
        await logout();
        router.push('/login')
    }
    return (
        <header className="flex h-16 w-full items-center px-4 md:px-6 shadow-2xl bg-foreground fixed top-0 z-50">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden mr-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='dark:bg-primary' variant="outline" size="icon">
                            <CiMenuFries className='text-foreground' />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-2 py-6">
                            {navItems.filter(item => item.type === 'public' || (item.type === 'private' && user)).map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`flex w-full items-center py-2 text-lg font-semibold text-white ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center" prefetch={false}>
                {/* <MountainIcon /> */}
                <div className='flex items-center'>
                    {/* <Image className='rounded-full' width={30} src={logo} alt='logo' /> */}
                    <span className={`ml-2 text-lg md:text-3xl italic font-bold text-white block`}>Rent Nest    </span>
                </div>
            </Link>
            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex grow justify-end mr-4">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-3">
                        {navItems.filter(item => item.type === 'public' || (item.type === 'private' && user)).map((item, index) => {
                            return (
                                <NavigationMenuLink asChild key={index}>
                                    <Link
                                        href={item.path}
                                        className={`group text-white font-bold text-base ${pathname === item.path ? 'underline shadow-2xl' : ''}`}
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </NavigationMenuLink>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Login/Register Buttons */}
            {user.success ? (
                <div className="ml-auto flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='border-2 border-white cursor-pointer'>
                                <RxAvatar />
                                <AvatarFallback />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className='select-none cursor-not-allowed'>{user?.data?.name}</DropdownMenuLabel>
                            <DropdownMenuLabel className='select-none cursor-not-allowed'>{user?.data?.email}</DropdownMenuLabel>
                            <DropdownMenuLabel className='cursor-pointer'><Link href='/update-profile'>Update Profile</Link></DropdownMenuLabel>
                            <DropdownMenuLabel className='cursor-pointer' onClick={async () => { await handleLogout() }}>LogOut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;