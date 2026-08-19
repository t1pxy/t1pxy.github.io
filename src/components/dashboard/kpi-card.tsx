import { Card, CardContent } from "@/components/ui/card";

type KpiCardProps = {
    title: string;
    value: string | number;
    description: string;
};

export default function KpiCard({
    title,
    value,
    description,
}: KpiCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                    {title}
                </p>

                <p className="mt-2 text-3xl font-bold">
                    {value}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}