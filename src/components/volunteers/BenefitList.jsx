import { CheckCircle } from "lucide-react";

const benefits = [
  "Certifikát o dobrovolnictví",
  "Zajištěná strava",
  "Příspěvek na dopravu",
  "Užitečné zkušenosti a zážitky",
];

export default function BenefitList() {
  return (
    <ul className="space-y-2 text-gray-600">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2">
          <CheckCircle size={18} className="text-funweek" /> {benefit}
        </li>
      ))}
    </ul>
  );
}
