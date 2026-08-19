import { Badge } from "@/components/ui/badge";
import type { AlertSeverity } from "@/lib/alerts";

type AlertSeverityBadgeProps = {
    severity: AlertSeverity;
};

export default function AlertSeverityBadge({
    severity,
}: AlertSeverityBadgeProps) {
    const config = {
        critical: {
            label: "Critical",
            className:
                "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
        },
        warning: {
            label: "Warning",
            className:
                "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        },
        info: {
            label: "Info",
            className:
                "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        },
    };
    const item = config[severity];
    return (
        <Badge
            variant="outline"
            className={item.className}
        >
            {item.label}
        </Badge>
    );
}