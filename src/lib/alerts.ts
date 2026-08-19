import { devices, type Device } from "@/lib/mock-data";

export type AlertSeverity = "critical" | "warning" | "info";

export type AlertType =
    | "offline"
    | "cpu"
    | "memory"
    | "disk";

export type Alert = {
    id: string;
    deviceId: number;
    deviceName: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    value: number | null;
    createdAt: string;
};

function createMetricAlert(
    device: Device,
    type: AlertType,
    value: number | null,
    label: string
): Alert | null {
    if (value === null) {
        return null;
    }
    if (value >= 90) {
        return {
            id: `${device.id}-${type}`,
            deviceId: device.id,
            deviceName: device.name,
            type,
            severity: "critical",
            message: `${label} usage is critically high`,
            value,
            createdAt: "Just now",
        };
    }
    if (value >= 80) {
        return {
            id: `${device.id}-${type}`,
            deviceId: device.id,
            deviceName: device.name,
            type,
            severity: "warning",
            message: `${label} usage is high`,
            value,
            createdAt: "Just now",
        };
    }
    return null;
}

export function generateAlerts(): Alert[] {
    const alerts: Alert[] = [];
    for (const device of devices) {
        if (device.status === "offline") {
            alerts.push({
                id: `${device.id}-offline`,
                deviceId: device.id,
                deviceName: device.name,
                type: "offline",
                severity: "critical",
                message: "Device is offline",
                value: null,
                createdAt: device.lastSeen,
            });
        }
        const cpuAlert = createMetricAlert(
            device,
            "cpu",
            device.cpu,
            "CPU"
        );
        const memoryAlert = createMetricAlert(
            device,
            "memory",
            device.memory,
            "Memory"
        );
        const diskAlert = createMetricAlert(
            device,
            "disk",
            device.disk,
            "Disk"
        );
        if (cpuAlert) alerts.push(cpuAlert);
        if (memoryAlert) alerts.push(memoryAlert);
        if (diskAlert) alerts.push(diskAlert);
    }
    return alerts;
}

export const alerts = generateAlerts();