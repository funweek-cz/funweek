import React from "react";
import {clientSupabase} from "@/lib/supabase/client";
import Image from "next/image";
import MemberCard from "@/components/team/MemberCard";

const parseDepartment = (departmentString) => {
    if (!departmentString) {
        return {name: "Neznámé", color: "#808080"};
    }
    const parts = departmentString.split(";#");
    const name = parts[0];
    const color = parts[1] ? `#${parts[1].replace("#", "")}` : "#808080";
    return {name, color};
};

const getTeamData = async () => {

}

export default async function TeamPage() {
    const teamData = await getTeamData();
    // const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            let {data, error} = await clientSupabase
                .from("profiles")
                .select(
                    "full_name, role, department, thumbnail_image, instagram, linkedin, discord, visible_email, priority",
                )
                .eq("visible_staff", true)
                .not("role", "is", null)
                .order("priority", {ascending: true, nullsFirst: false})
                .order("role", {ascending: true});

            if (error) {
                setError(`Nepodařilo se načíst data týmu. Detaily: ${error.message}`);
                setLoading(false);
                return;
            }

            const mappedTeam = data.map((profile) => {
                const {name: depName, color: depColor} = parseDepartment(
                    profile.department,
                );

                const socials = {
                    email: profile.visible_email
                        ? `mailto:${profile.visible_email}`
                        : null,
                    instagram: profile.instagram,
                    linkedin: profile.linkedin,
                    discord: profile.discord,
                };
                const finalImageUrl = profile.thumbnail_image || "/assets/images/content/image-unavailable.webp";

                return {
                    name: profile.full_name,
                    role: profile.role,
                    department: depName,
                    depColor: depColor,
                    image: finalImageUrl,
                    socials: socials,
                    availability: null,
                };
            });

            setTeamData(mappedTeam);
            setLoading(false);
        };

        fetchTeam();
    }, []);

    if (error) {
        return (
            <main className="w-full px-50 py-50 flex flex-col justify-center items-center">
                <Image alt={"Die"} src="/die.png" width="100" className="mb-10"/>
                <h1 className="text-4xl font-bold">Server udělal bác...</h1>
                <h2 className="text-2xl text-center">
                    Omlouváme se, ale nemůžeme přistoupit k datům na našich serverech.
                    Pokud chyba přetrvává, kontaktujte prosím technický tým na{" "}
                    <a src="mailto:it@funweek.cz" className="underline cursor-pointer">
                        it@funweek.cz
                    </a>
                </h2>
                <a
                    href="/funweek/public"
                    className="font-bold mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white "
                >
                    Zpět na domovskou stránku
                </a>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="w-full px-10 md:px-50 mt-30 flex flex-col justify-center items-center">
                <p>Načítání stránky...</p>
            </main>
        );
    }

    if (teamData.length === 0) {
        return (
            <main className="w-full px-50 py-50 flex flex-col justify-center items-center">
                <Image alt={"Die"} src="/die.png" width="100" className="mb-10"/>
                <h1 className="text-4xl font-bold">Server vrátil null...</h1>
                <h2 className="text-2xl text-center">
                    Omlouváme se, v tuto chvíli nemůžeme přistoupit k datům na našich
                    serverech. Pokud tuto hlášku vidíte, o chybě už víme a pracujeme na
                    opravě. Pro více informací kontaktujte náš technický tým na{" "}
                    <a src="mailto:it@funweek.cz" className="underline cursor-pointer">
                        it@funweek.cz
                    </a>
                    . Díky za trpělivost.
                </h2>
                <a
                    href="/funweek/public"
                    className="font-bold mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white "
                >
                    Zpět na domovskou stránku
                </a>
            </main>
        );
    }

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-10 mt-10 w-full">
                {teamData.map((member, index) => (
                    <MemberCard member={member} key={index} />
                ))}
            </div>
        </main>
    );
}
