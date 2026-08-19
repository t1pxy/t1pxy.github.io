"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { PerformancePoint } from "@/lib/mock-data";

type PerformanceChartProps = {
    data: PerformancePoint[];
};

export default function PerformanceChart({
    data,
}: PerformanceChartProps) {
    return (
        <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        formatter={(value, name) => [
                            `${value}%`,
                            name === "cpu"
                                ? "CPU"
                                : name === "memory"
                                    ? "Memory"
                                    : "Disk",
                        ]}
                    />
                    <Line
                        type="monotone"
                        dataKey="cpu"
                        stroke="currentColor"
                        strokeWidth={2}
                        dot={false}
                        name="cpu"
                    />
                    <Line
                        type="monotone"
                        dataKey="memory"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="memory"
                    />
                    <Line
                        type="monotone"
                        dataKey="disk"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeDasharray="2 4"
                        dot={false}
                        name="disk"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}