export type DeviceStatus = "online" | "offline" | "warning";

export type Device = {
    id: number;
    name: string;
    ip: string;
    user: string;
    department: string;
    status: DeviceStatus;
    cpu: number | null;
    memory: number | null;
    disk: number | null;
    lastSeen: string;
};

export const devices: Device[] = [
    {
        id: 1,
        name: "PC-IT-001",
        ip: "192.168.1.101",
        user: "Admin",
        department: "IT",
        status: "online",
        cpu: 34,
        memory: 52,
        disk: 61,
        lastSeen: "Just now",
    },
    {
        id: 2,
        name: "PC-HR-002",
        ip: "192.168.1.102",
        user: "Somchai",
        department: "HR",
        status: "offline",
        cpu: null,
        memory: null,
        disk: null,
        lastSeen: "12 min ago",
    },
    {
        id: 3,
        name: "PC-FIN-003",
        ip: "192.168.1.103",
        user: "Suda",
        department: "Finance",
        status: "warning",
        cpu: 87,
        memory: 76,
        disk: 82,
        lastSeen: "1 min ago",
    },
    {
        id: 4,
        name: "PC-SALES-004",
        ip: "192.168.1.104",
        user: "Anan",
        department: "Sales",
        status: "online",
        cpu: 28,
        memory: 44,
        disk: 55,
        lastSeen: "Just now",
    },
    {
        id: 5,
        name: "PC-OPS-005",
        ip: "192.168.1.105",
        user: "Narin",
        department: "Operations",
        status: "online",
        cpu: 41,
        memory: 63,
        disk: 68,
        lastSeen: "Just now",
    },
];

export type PerformancePoint = {
    time: string;
    cpu: number;
    memory: number;
    disk: number;
};

export const performanceHistory: PerformancePoint[] = [
    { time: "08:00", cpu: 21, memory: 48, disk: 58 },
    { time: "09:00", cpu: 34, memory: 52, disk: 59 },
    { time: "10:00", cpu: 41, memory: 55, disk: 60 },
    { time: "11:00", cpu: 37, memory: 57, disk: 61 },
    { time: "12:00", cpu: 52, memory: 61, disk: 62 },
    { time: "13:00", cpu: 44, memory: 59, disk: 63 },
    { time: "14:00", cpu: 63, memory: 66, disk: 64 },
    { time: "15:00", cpu: 72, memory: 69, disk: 66 },
    { time: "16:00", cpu: 58, memory: 65, disk: 67 },
    { time: "17:00", cpu: 47, memory: 61, disk: 68 },
    { time: "18:00", cpu: 39, memory: 58, disk: 69 },
];