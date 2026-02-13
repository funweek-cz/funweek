import Image from "next/image";
import MemberCard from "@/components/team/MemberCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const parseDepartment = (departmentString) => {
  if (!departmentString) {
    return { name: "Neznámé", color: "#808080" };
  }
  const parts = departmentString.split(";#");
  const name = parts[0];
  const color = parts[1] ? `#${parts[1].replace("#", "")}` : "#808080";
  return { name, color };
};

const getTeamData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "full_name, role, department, thumbnail_image, instagram, linkedin, discord, visible_email, priority",
    )
    .eq("visible_staff", true)
    .not("role", "is", null)
    .order("priority", { ascending: true, nullsFirst: false })
    .order("role", { ascending: true });

  const result = data.map((profile) => {
    const { name: depName, color: depColor } = parseDepartment(
      profile.department,
    );

    const socials = {
      email: profile.visible_email ? `mailto:${profile.visible_email}` : null,
      instagram: profile.instagram,
      linkedin: profile.linkedin,
      discord: profile.discord,
    };
    const finalImageUrl =
      profile.thumbnail_image ||
      "/assets/images/content/team-member-thumbnail-unavailable.webp";

    return {
      name: profile.full_name,
      role: profile.role,
      department: depName,
      depColor,
      image: finalImageUrl,
      socials,
      availability: null,
    };
  });

  console.log(result);
  return { result, error };
};

export default async function TeamPage() {
  const { result: data, error } = await getTeamData();
  const dataAvailable = !error && data && data.length > 0;

  return (
    <main className="w-full px-10 md:px-50 mt-30 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-center text-4xl mb-3 md:mb-0 md:text-5xl font-bold md:leading-15">
          Spojuje nás vize světa, kde se každý cítí být rovnocenný a přijatý.
        </h1>
        <span className="text-center text-xl px-5 md:px-25">
          Naše filozofie je o aktivním budování důvěry a respektu. Věříme v sílu
          autenticity a diverzity a zavazujeme se tyto hodnoty rozvíjet.
          Neomezujeme se jen na žáky základních škol – naším cílem je posílit
          sebevědomí a plný potenciál v každém, kdo s námi sdílí cestu.
        </span>
      </div>

      <div
        className={`${dataAvailable ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" : "flex flex-col gap-2 px-8 py-24 bg-neutral-200/70 rounded-2xl"} justify-center items-center mt-10 w-full`}
      >
        {dataAvailable ? (
          data.map((member, index) => (
            <MemberCard member={member} key={index} />
          ))
        ) : (
          <>
            <Image
              alt={"Die emoji"}
              src="/assets/images/ui/die.webp"
              width="100"
              height="100"
              className="mb-4"
            />
            <h1 className="text-4xl font-bold">Server udělal bác...</h1>
            <h2 className="text-xl text-center">
              Omlouváme se, v tuto chvíli nemůžeme přistoupit k datům na našich
              serverech. Pokud tuto hlášku vidíte, o chybě už víme a pracujeme
              na opravě. Pro více informací kontaktujte náš technický tým na{" "}
              <Link
                href="mailto:it@funweek.cz"
                className="underline cursor-pointer"
              >
                it@funweek.cz
              </Link>
              . Díky za trpělivost.
            </h2>
          </>
        )}
      </div>
    </main>
  );
}
