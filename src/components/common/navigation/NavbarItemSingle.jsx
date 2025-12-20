import Link from "next/link";

const NavbarItemSingle = ({
  link = "/",
  label = "Nový odkaz",
  scrolled = false,
}) => {
  return (
    <li>
      <Link
        href={link}
        className={`font-bold px-4 py-2 rounded-lg block group transition-colors duration-300 ${scrolled ? "text-white" : "text-funweek"}`}
      >
        {label}
        <div
          className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 ${scrolled ? "bg-white" : "bg-funweek"}`}
        ></div>
      </Link>
    </li>
  );
};

export default NavbarItemSingle;
