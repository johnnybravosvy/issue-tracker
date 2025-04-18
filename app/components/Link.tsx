import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
    href: string;
    children: React.ReactNode;
}

const Link = ({ href, children, ...props }: Props) => {
    return (
        <RadixLink asChild>
            <NextLink href={href} {...props}>
                {children}
            </NextLink>
        </RadixLink>
    );
};

export default Link;