"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Monitor } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatusBadge from "@/components/dashboard/status-badge";
import DeviceFilters from "@/components/devices/device-filters";
import { devices } from "@/lib/mock-data";

export default function DevicesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [department, setDepartment] = useState("all");
    const departments = useMemo(() => {
        return Array.from(
            new Set(devices.map((device) => device.department))
        ).sort();
    }, []);
    const filteredDevices = useMemo(() => {
        const query = search.trim().toLowerCase();
        return devices.filter((device) => {
            const matchesSearch =
                query === "" ||
                device.name.toLowerCase().includes(query) ||
                device.ip.toLowerCase().includes(query) ||
                device.user.toLowerCase().includes(query);
            const matchesStatus =
                status === "all" || device.status === status;
            const matchesDepartment =
                department === "all" ||
                device.department === department;
            return (
                matchesSearch &&
                matchesStatus &&
                matchesDepartment
            );
        });
    }, [search, status, department]);
    const resetFilters = () => {
        setSearch("");
        setStatus("all");
        setDepartment("all");
    };

    return (
        <div className="min-h-screen bg-muted/40">
            <Sidebar />
            <div className="lg:pl-64">
                <Header />
                <main className="p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Page Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Devices
                                </h1>
                                <p className="text-muted-foreground">
                                    Monitor and manage all registered devices
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2">
                                <Monitor className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    {devices.length} devices
                                </span>
                            </div>
                        </div>
                        {/* Device Table Card */}
                        <div className="rounded-xl border bg-background">
                            {/* Card Header */}
                            <div className="border-b px-6 py-4">
                                <h2 className="font-semibold">All Devices</h2>
                                <p className="text-sm text-muted-foreground">
                                    Current monitoring status
                                </p>
                            </div>
                            {/* Filters */}
                            <DeviceFilters
                                search={search}
                                status={status}
                                department={department}
                                departments={departments}
                                onSearchChange={setSearch}
                                onStatusChange={setStatus}
                                onDepartmentChange={setDepartment}
                                onReset={resetFilters}
                            />
                            {/* Result Count */}
                            <div className="flex items-center justify-between border-b px-6 py-3">
                                <p className="text-sm text-muted-foreground">
                                    Showing{" "}
                                    <span className="font-medium text-foreground">
                                        {filteredDevices.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-foreground">
                                        {devices.length}
                                    </span>{" "}
                                    devices
                                </p>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="px-6 py-4 font-medium">
                                                Device
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                IP Address
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                User
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Department
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                CPU
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Memory
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Last Seen
                                            </th>
                                            <th className="px-6 py-4" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDevices.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={9}
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <div className="space-y-2">
                                                        <p className="font-medium">
                                                            No devices found
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Try changing your search or filters.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredDevices.map((device) => (
                                                <tr
                                                    key={device.id}
                                                    className="border-b last:border-0 hover:bg-muted/40"
                                                >
                                                    {/* Device */}
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium">
                                                                {device.name}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Device #{device.id}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    {/* IP */}
                                                    <td className="px-6 py-4 font-mono text-xs">
                                                        {device.ip}
                                                    </td>
                                                    {/* User */}
                                                    <td className="px-6 py-4">
                                                        {device.user}
                                                    </td>
                                                    {/* Department */}
                                                    <td className="px-6 py-4">
                                                        {device.department}
                                                    </td>
                                                    {/* Status */}
                                                    <td className="px-6 py-4">
                                                        <StatusBadge
                                                            status={device.status}
                                                        />
                                                    </td>
                                                    {/* CPU */}
                                                    <td className="px-6 py-4">
                                                        {device.cpu !== null
                                                            ? `${device.cpu}%`
                                                            : "-"}
                                                    </td>
                                                    {/* Memory */}
                                                    <td className="px-6 py-4">
                                                        {device.memory !== null
                                                            ? `${device.memory}%`
                                                            : "-"}
                                                    </td>
                                                    {/* Last Seen */}
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {device.lastSeen}
                                                    </td>
                                                    {/* Action */}
                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href={`/dashboard/devices/${device.id}`}
                                                            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                                                        >
                                                            View
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
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