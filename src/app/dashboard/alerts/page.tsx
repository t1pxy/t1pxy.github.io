"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowRight,
    Bell,
    CircleAlert,
    Info,
} from "lucide-react";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import AlertSeverityBadge from "@/components/dashboard/alert-severity-badge";
import { alerts } from "@/lib/alerts";

type SeverityFilter = "all" | "critical" | "warning" | "info";

export default function AlertsPage() {
    const [severity, setSeverity] =
        useState<SeverityFilter>("all");

    const filteredAlerts = useMemo(() => {
        if (severity === "all") {
            return alerts;
        }

        return alerts.filter(
            (alert) => alert.severity === severity
        );
    }, [severity]);

    const criticalCount = alerts.filter(
        (alert) => alert.severity === "critical"
    ).length;

    const warningCount = alerts.filter(
        (alert) => alert.severity === "warning"
    ).length;

    const infoCount = alerts.filter(
        (alert) => alert.severity === "info"
    ).length;

    return (
        <div className="min-h-screen bg-muted/40">
            <Sidebar />
            <div className="lg:pl-64">
                <Header />
                <main className="p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Alerts
                                </h1>
                                <p className="text-muted-foreground">
                                    Monitor device health and system alerts
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2">
                                <Bell className="h-4 w-4 text-muted-foreground" />

                                <span className="text-sm font-medium">
                                    {alerts.length} active alerts
                                </span>
                            </div>
                        </div>
                        {/* Summary */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => setSeverity("critical")}
                                className={`rounded-xl border bg-background p-5 text-left transition hover:bg-muted/40 ${severity === "critical"
                                        ? "ring-2 ring-red-500/30"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        Critical
                                    </span>
                                    <CircleAlert className="h-5 w-5" />
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {criticalCount}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Requires immediate attention
                                </p>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSeverity("warning")}
                                className={`rounded-xl border bg-background p-5 text-left transition hover:bg-muted/40 ${severity === "warning"
                                        ? "ring-2 ring-yellow-500/30"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        Warning
                                    </span>
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {warningCount}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Needs attention
                                </p>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSeverity("info")}
                                className={`rounded-xl border bg-background p-5 text-left transition hover:bg-muted/40 ${severity === "info"
                                        ? "ring-2 ring-blue-500/30"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        Info
                                    </span>
                                    <Info className="h-5 w-5" />
                                </div>
                                <p className="mt-3 text-3xl font-bold">
                                    {infoCount}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Informational events
                                </p>
                            </button>
                        </div>
                        {/* Filter */}
                        <div className="flex flex-wrap items-center gap-2">
                            {(
                                ["all", "critical", "warning", "info"] as const
                            ).map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setSeverity(item)}
                                    className={`rounded-lg border px-4 py-2 text-sm capitalize transition ${severity === item
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-background hover:bg-muted"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        {/* Alert List */}
                        <div className="rounded-xl border bg-background">
                            <div className="border-b px-6 py-4">
                                <h2 className="font-semibold">
                                    Active Alerts
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Showing {filteredAlerts.length} alerts
                                </p>
                            </div>
                            <div className="divide-y">
                                {filteredAlerts.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <p className="font-medium">
                                            No alerts found
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            There are no alerts for this filter.
                                        </p>
                                    </div>
                                ) : (
                                    filteredAlerts.map((alert) => (
                                        <div
                                            key={alert.id}
                                            className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                    {alert.severity === "critical" ? (
                                                        <CircleAlert className="h-5 w-5" />
                                                    ) : alert.severity === "warning" ? (
                                                        <AlertTriangle className="h-5 w-5" />
                                                    ) : (
                                                        <Info className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Link
                                                            href={`/dashboard/devices/${alert.deviceId}`}
                                                            className="font-semibold hover:underline"
                                                        >
                                                            {alert.deviceName}
                                                        </Link>
                                                        <AlertSeverityBadge
                                                            severity={alert.severity}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {alert.message}
                                                    </p>
                                                    {alert.value !== null && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Current value:{" "}
                                                            <span className="font-medium text-foreground">
                                                                {alert.value}%
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 lg:justify-end">
                                                <span className="text-xs text-muted-foreground">
                                                    {alert.createdAt}
                                                </span>
                                                <Link
                                                    href={`/dashboard/devices/${alert.deviceId}`}
                                                    className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                                                >
                                                    View Device
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}