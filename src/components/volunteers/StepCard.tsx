import { FileText, Smile, CheckCircle } from "lucide-react";

const icons = {
  FileText,
  Smile,
  CheckCircle,
};

export default function StepCard({
  icon,
  title,
  children,
  isFinal,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  isFinal?: boolean;
}) {
  const Icon = icons[icon as keyof typeof icons];
  const cardClasses = `flex-1 rounded-2xl p-8 relative overflow-hidden ${
    isFinal ? "bg-funweek text-white" : "bg-gray-100"
  }`;
  const iconClasses = `w-8 h-8 mb-4 ${isFinal ? "text-white" : "text-funweek"}`;
  const textClasses = `text-sm ${isFinal ? "text-white/80" : "text-gray-600"}`;

  return (
    <div className={cardClasses}>
      <div className="relative z-10">
        {Icon && <Icon className={iconClasses} />}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={textClasses}>{children}</p>
      </div>
    </div>
  );
}
