import Link from "next/link";
import {
    ArrowLeft,
    Cpu,
    HardDrive,
    MemoryStick,
    Monitor,
    Network,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatusBadge from "@/components/dashboard/status-badge";
import PerformanceChart from "@/components/dashboard/performance-chart";
import MetricCard from "@/components/dashboard/metric-card";
import { devices, performanceHistory } from "@/lib/mock-data";

type DeviceDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export function generateStaticParams() {
    return devices.map((device) => ({
        id: String(device.id),
    }));
}

export default async function DeviceDetailPage({
    params,
}: DeviceDetailPageProps) {
    const { id } = await params;
    const device = devices.find(
        (item) => item.id === Number(id)
    );
    if (!device) {
        return (
            <div className="min-h-screen bg-muted/40">
                <Sidebar />
                <div className="lg:pl-64">
                    <Header />
                    <main className="p-6">
                        <div className="mx-auto max-w-7xl">
                            <div className="rounded-xl border bg-background p-8 text-center">
                                <h1 className="text-xl font-semibold">
                                    Device Not Found
                                </h1>
                                <p className="mt-2 text-muted-foreground">
                                    The requested device does not exist.
                                </p>
                                <Link
                                    href="/dashboard/devices"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Devices
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <Sidebar />
            <div className="lg:pl-64">
                <Header />
                <main className="p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Back */}
                        <Link
                            href="/dashboard/devices"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Devices
                        </Link>
                        {/* Device Header */}
                        <div className="rounded-xl border bg-background p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                                        <Monitor className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">
                                            {device.name}
                                        </h1>
                                        <p className="text-sm text-muted-foreground">
                                            {device.ip}
                                        </p>
                                    </div>
                                </div>
                                <StatusBadge status={device.status} />
                            </div>
                        </div>
                        {/* Performance */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <MetricCard
                                title="CPU Usage"
                                value={device.cpu}
                            />

                            <MetricCard
                                title="Memory Usage"
                                value={device.memory}
                            />

                            <MetricCard
                                title="Disk Usage"
                                value={device.disk}
                            />
                        </div>
                        {/* Device Information */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border bg-background p-6">
                                <h2 className="text-lg font-semibold">
                                    Device Information
                                </h2>
                                <div className="mt-6 space-y-4">
                                    <InfoRow
                                        label="Device Name"
                                        value={device.name}
                                    />
                                    <InfoRow
                                        label="IP Address"
                                        value={device.ip}
                                    />
                                    <InfoRow
                                        label="User"
                                        value={device.user}
                                    />
                                    <InfoRow
                                        label="Department"
                                        value={device.department}
                                    />
                                    <InfoRow
                                        label="Last Seen"
                                        value={device.lastSeen}
                                    />
                                </div>
                            </div>
                            <div className="rounded-xl border bg-background p-6">
                                <h2 className="text-lg font-semibold">
                                    Network
                                </h2>
                                <div className="mt-6 space-y-4">
                                    <InfoRow
                                        label="IP Address"
                                        value={device.ip}
                                    />
                                    <InfoRow
                                        label="Connection"
                                        value={device.status === "offline" ? "Disconnected" : "Connected"}
                                    />
                                    <InfoRow
                                        label="Last Response"
                                        value={device.lastSeen}
                                    />
                                    <InfoRow
                                        label="Monitoring"
                                        value="Active"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Performance History */}
                        <div className="rounded-xl border bg-background p-6">
                            <div className="flex items-center gap-3">
                                <Network className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Performance History
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Historical metrics will appear here
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <PerformanceChart data={performanceHistory} />

                                <div className="mt-4 flex flex-wrap gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                                        <span>CPU</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                                        <span>Memory</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                                        <span>Disk</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
            <span className="text-sm text-muted-foreground">
                {label}
            </span>
            <span className="text-sm font-medium text-right">
                {value}
            </span>
        </div>
    );
}