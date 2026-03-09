export default function TeamCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl p-6 bg-gray-100">
      <div className="text-funweek mb-3 transition-transform duration-300 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm opacity-90 text-gray-600">{desc}</p>
    </div>
  );
}
