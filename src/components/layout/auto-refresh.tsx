"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL = 300_000;

export default function AutoRefresh() {
    const router = useRouter();

    const [lastUpdated, setLastUpdated] = useState(
        new Date()
    );

    const [countdown, setCountdown] = useState(
        REFRESH_INTERVAL / 1000
    );

    useEffect(() => {
        const refreshTimer = window.setInterval(() => {
            router.refresh();

            setLastUpdated(new Date());
            setCountdown(REFRESH_INTERVAL / 1000);
        }, REFRESH_INTERVAL);

        const countdownTimer = window.setInterval(() => {
            setCountdown((current) => {
                if (current <= 1) {
                    return REFRESH_INTERVAL / 1000;
                }

                return current - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(refreshTimer);
            window.clearInterval(countdownTimer);
        };
    }, [router]);

    return (
        <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>

                <span className="text-xs font-medium">
                    Live
                </span>
            </div>

            <div className="text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
            </div>

            <button
                type="button"
                onClick={() => {
                    router.refresh();
                    setLastUpdated(new Date());
                    setCountdown(REFRESH_INTERVAL / 1000);
                }}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <RefreshCw className="h-3.5 w-3.5" />

                Refresh
            </button>

            <div className="text-xs text-muted-foreground">
                {countdown}s
            </div>
        </div>
    );
}