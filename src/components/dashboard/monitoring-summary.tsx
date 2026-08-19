"use client";

import { useEffect, useState } from "react";
import {
    Activity,
    Clock,
    Radio,
} from "lucide-react";

export default function MonitoringSummary() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5" />

                    <span className="text-sm font-medium">
                        Monitoring Status
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                    <span className="font-semibold">
                        Operational
                    </span>
                </div>
            </div>

            <div className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                    <Radio className="h-5 w-5" />

                    <span className="text-sm font-medium">
                        Connection
                    </span>
                </div>

                <p className="mt-4 text-lg font-semibold">
                    Connected
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    Monitoring service is active
                </p>
            </div>

            <div className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" />

                    <span className="text-sm font-medium">
                        Current Time
                    </span>
                </div>

                <p className="mt-4 text-lg font-semibold">
                    {now.toLocaleTimeString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    System local time
                </p>
            </div>
        </div>
    );
}