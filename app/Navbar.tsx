'use client'

import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { text } from 'body-parser';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const Navbar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/"><FaBug /></Link>
            <ul className="flex space-x-6">
                {links.map(link =>
                    <li key={link.href}>
                        <Link
                            className={classNames({
                                "text-zinc-900": link.href === currentPath,
                                "text-zinc-500": link.href !== currentPath,
                                "hover:text-zinc-800 transition-colors": true,
                            })}
                            href={link.href}>{link.label}</Link></li>)}

            </ul>
            <Box>
                {status === "authenticated" && <Link href="/api/auth/signout">Logout</Link>}
                {status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
            </Box>
        </nav>
    )
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