"use client";

import { Search, X } from "lucide-react";

type DeviceFiltersProps = {
    search: string;
    status: string;
    department: string;
    departments: string[];
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDepartmentChange: (value: string) => void;
    onReset: () => void;
};

export default function DeviceFilters({
    search,
    status,
    department,
    departments,
    onSearchChange,
    onStatusChange,
    onDepartmentChange,
    onReset,
}: DeviceFiltersProps) {
    const hasFilter =
        search !== "" ||
        status !== "all" ||
        department !== "all";
    return (
        <div className="space-y-4 border-b p-6">
            <div className="flex flex-col gap-3 lg:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search device, IP, user..."
                        className="h-10 w-full rounded-lg border bg-background pl-9 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                    />
                </div>
                {/* Status */}
                <select
                    value={status}
                    onChange={(event) =>
                        onStatusChange(event.target.value)
                    }
                    className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="all">All Status</option>
                    <option value="online">Online</option>
                    <option value="warning">Warning</option>
                    <option value="offline">Offline</option>
                </select>
                {/* Department */}
                <select
                    value={department}
                    onChange={(event) =>
                        onDepartmentChange(event.target.value)
                    }
                    className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="all">All Departments</option>
                    {departments.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {/* Reset */}
                {hasFilter && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm hover:bg-muted"
                    >
                        <X className="h-4 w-4" />
                        Reset
                    </button>
                )}
            </div>
            {hasFilter && (
                <p className="text-xs text-muted-foreground">
                    Filters are active
                </p>
            )}
        </div>
    );
}