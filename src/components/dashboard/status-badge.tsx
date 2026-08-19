import { Badge } from "@/components/ui/badge";
import type { DeviceStatus } from "@/lib/mock-data";

type StatusBadgeProps = {
    status: DeviceStatus;
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    if (status === "online") {
        return (
            <Badge variant="outline">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500" />
                Online
            </Badge>
        );
    }
    if (status === "warning") {
        return (
            <Badge variant="outline">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-yellow-500" />
                Warning
            </Badge>
        );
    }
    return (
        <Badge variant="outline">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500" />
            Offline
        </Badge>
    );
}