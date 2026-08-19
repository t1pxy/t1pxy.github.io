"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Monitor,
    Bell,
    Settings,
    Server,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Devices",
        href: "/dashboard/devices",
        icon: Monitor,
    },
    {
        name: "Alerts",
        href: "/dashboard/alerts",
        icon: Bell,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-background lg:block">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Server className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold">StarCat</p>
                            <p className="text-xs text-muted-foreground">
                                Device Monitor
                            </p>
                        </div>
                    </div>
                </div>
                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                {/* Footer */}
                <div className="border-t p-4">
                    <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs font-medium">
                            Monitoring Status
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs text-muted-foreground">
                                System Operational
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}