import KpiCard from "@/components/dashboard/kpi-card";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatusBadge from "@/components/dashboard/status-badge";
import MonitoringSummary from "@/components/dashboard/monitoring-summary";
import { alerts } from "@/lib/alerts";
import { devices } from "@/lib/mock-data";

export default function DashboardPage() {
    const total = devices.length;
    const online = devices.filter(
        (device) => device.status === "online"
    ).length;
    const offline = devices.filter(
        (device) => device.status === "offline"
    ).length;
    const warning = devices.filter(
        (device) => device.status === "warning"
    ).length;
    return (
        <div className="min-h-screen bg-muted/40">
            <Sidebar />
            <div className="lg:pl-64">
                <Header />
                <main className="p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                StarCat Device Monitor
                            </h1>
                            <p className="text-muted-foreground">
                                Monitor and manage your devices
                            </p>
                        </div>
                        <MonitoringSummary />
                        {/* KPI */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <KpiCard
                                title="Total Devices"
                                value={total}
                                description="All registered devices"
                            />
                            <KpiCard
                                title="Online"
                                value={online}
                                description="Devices currently online"
                            />
                            <KpiCard
                                title="Offline"
                                value={offline}
                                description="Devices not responding"
                            />
                            <KpiCard
                                title="Warning"
                                value={warning}
                                description="Devices requiring attention"
                            />
                        </div>
                        {/* Content */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border bg-background p-6">
                                <h2 className="text-lg font-semibold">
                                    Device Status
                                </h2>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Online</span>
                                        <span className="font-semibold">{online}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Offline</span>
                                        <span className="font-semibold">{offline}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Warning</span>
                                        <span className="font-semibold">{warning}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border bg-background p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Recent Alerts
                                        </h2>

                                        <p className="text-sm text-muted-foreground">
                                            Latest device issues
                                        </p>
                                    </div>

                                    <a
                                        href="/dashboard/alerts"
                                        className="text-sm font-medium hover:underline"
                                    >
                                        View all
                                    </a>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {alerts.slice(0, 5).map((alert) => (
                                        <div
                                            key={alert.id}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {alert.deviceName}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {alert.message}
                                                </p>
                                            </div>

                                            <span className="text-xs text-muted-foreground">
                                                {alert.createdAt}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Device Table */}
                        <div className="rounded-xl border bg-background p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    Devices
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Current device status
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-4 py-3">Device</th>
                                            <th className="px-4 py-3">IP</th>
                                            <th className="px-4 py-3">Department</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3">CPU</th>
                                            <th className="px-4 py-3">Memory</th>
                                            <th className="px-4 py-3">Disk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {devices.map((device) => (
                                            <tr
                                                key={device.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 font-medium">
                                                    {device.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {device.ip}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {device.department}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <StatusBadge status={device.status} />
                                                </td>
                                                <td className="px-4 py-3">
                                                    {device.cpu !== null
                                                        ? `${device.cpu}%`
                                                        : "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {device.memory !== null
                                                        ? `${device.memory}%`
                                                        : "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {device.disk !== null
                                                        ? `${device.disk}%`
                                                        : "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}