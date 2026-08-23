
'use client';

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const SiteChrome = ({
    navbar,
    footer,
    children,
}: {
    navbar: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}) => {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/private/dashboard");

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <>
            {navbar}
            {children}
            {footer}
        </>
    );
};

export default SiteChrome;