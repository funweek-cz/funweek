import { BookOpen, Users, Heart, Zap } from "lucide-react";

const icons = {
  BookOpen,
  Users,
  Heart,
  Zap,
};

export default function BenefitCard({
  icon,
  title,
  children,
}: {
  icon: keyof typeof icons;
  title: string;
  children: React.ReactNode;
}) {
  const Icon = icons[icon];
  return (
    <div className="text-funweek rounded-2xl p-8 flex flex-col gap-4 bg-gray-100">
      {Icon && <Icon className="w-10 h-10 mb-2" />}
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <span className="text-sm leading-relaxed opacity-90 block text-gray-600">
          {children}
        </span>
      </div>
    </div>
  );
}
