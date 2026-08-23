import type { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{label}</CardTitle>
      <Icon size={16} className="text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <p className="font-heading text-2xl text-card-foreground">{value}</p>
    </CardContent>
  </Card>
);

export default StatCard;