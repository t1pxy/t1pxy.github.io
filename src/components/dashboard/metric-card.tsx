import {
    ArrowDown,
    ArrowUp,
    Minus,
} from "lucide-react";

type MetricCardProps = {
    title: string;
    value: number | null;
    unit?: string;
};

export default function MetricCard({
    title,
    value,
    unit = "%",
}: MetricCardProps) {
    const isUnavailable = value === null;
    const isCritical =
        value !== null && value >= 90;
    const isWarning =
        value !== null && value >= 80;
    const Icon = isUnavailable
        ? Minus
        : isCritical
            ? ArrowUp
            : ArrowDown;
    return (
        <div className="rounded-xl border bg-background p-6">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                    {title}
                </p>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-end gap-1">
                <p className="text-3xl font-bold">
                    {isUnavailable ? "-" : value}
                </p>
                {!isUnavailable && (
                    <span className="mb-1 text-sm text-muted-foreground">
                        {unit}
                    </span>
                )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
                {isUnavailable
                    ? "Unavailable"
                    : isCritical
                        ? "Critical usage"
                        : isWarning
                            ? "High usage"
                            : "Normal usage"}
            </p>
        </div>
    );
}