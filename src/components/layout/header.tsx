import { Bell, Search } from "lucide-react";

import AutoRefresh from "@/components/layout/auto-refresh";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
            <div>
                <p className="text-sm font-medium">
                    Device Monitoring
                </p>

                <p className="text-xs text-muted-foreground">
                    Real-time infrastructure overview
                </p>
            </div>

            <div className="flex items-center gap-3">
                <AutoRefresh />

                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
                    aria-label="Search"
                >
                    <Search className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />

                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="ml-1 flex items-center gap-3 border-l pl-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        A
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm font-medium">
                            Administrator
                        </p>

                        <p className="text-xs text-muted-foreground">
                            IT Department
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}