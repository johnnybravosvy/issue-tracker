'use client'

import { Skeleton } from '@/app/components'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <FaBug />
                        </Link>
                        <NavLinks />

                    </Flex>
                    <AuthStatus />
                </Flex>

            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()


    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ]
    return <ul className="flex space-x-6">
        {links.map(link =>
            <li key={link.href}>
                <Link
                    className={classNames({
                        "nav-link": true,
                        "!text-zinc-900": link.href === currentPath,

                    })}
                    href={link.href}>{link.label}</Link></li>)}

    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === "loading") return <Skeleton width="3rem" />;

    if (status === "unauthenticated")
        return <Link className="nav-link" href="/api/auth/signin">Login</Link>


    return <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    src={session!.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy='no-referrer'
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size="2">
                        {session!.user!.email}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    </Box>
}

export default Navbar


// styling active link using classnames module
// const Navbar = () => {
//     const currentPath = usePathname()

//     const links = [
//         { label: "Dashboard", href: "/" },
//         { label: "Issues", href: "/issues" },
//     ]

//     return (
//         <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
//             <Link href="/"><FaBug /></Link>
//             <ul className="flex space-x-6">
//                 {links.map(link =>
//                     <Link
//                         key={link.href}
//                         className={classNames({
//                             "text-zinc-900": link.href === currentPath,
//                             "text-zinc-500": link.href !== currentPath,
//                             "hover:text-zinc-800 transition-colors": true,
//                         })}
//                         href={link.href}>{link.label}</Link>)}

//             </ul>
//         </nav>
//     )
// }

// export default Navbar


// styling activelink
// import React from 'react'
// import Link from 'next/link'
// import { FaBug } from "react-icons/fa6";
// import { usePathname } from 'next/navigation';

// const Navbar = () => {
//     const currentPath = usePathname()

//     const links = [
//         { label: "Dashboard", href: "/" },
//         { label: "Issues", href: "/issues" },
//     ]

//     return (
//         <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
//             <Link href="/"><FaBug /></Link>
//             <ul className="flex space-x-6">
//                 {links.map(link =>
//                     <Link
//                         key={link.href}
//                         className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"}text-zinc-500 hover:text-zinc-900 transition-colors`}
//                         href={link.href}>{link.label}</Link>)}

//             </ul>
//         </nav>
//     )
// }

// const Navbar = () => {
//     return (
//         <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
//             <Link href="/"><FaBug /></Link>
//             <ul className="flex space-x-6">
//                 <li className="text-zinc-500 hover:text-zinc-900 transition "><Link href="/">Dashboard</Link></li>
//                 <li><Link href="/issues">Issues</Link></li>
//             </ul>
//         </nav>
//     )
// }

// export default Navbar