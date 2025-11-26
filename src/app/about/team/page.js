"use client"

import React, { useState, useEffect } from "react";
import { supabase } from '@/supabaseClient';

const FALLBACK_IMAGE_URL = "https://yrrpusyjrzcaqqnydsuo.supabase.co/storage/v1/object/sign/usables/image-unavailable.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kZGU0ZDUyMC01MjUzLTQ0ZjYtYWE2NS0xNDljMTUyMDQ0NDIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1c2FibGVzL2ltYWdlLXVuYXZhaWxhYmxlLnBuZyIsImlhdCI6MTc2NDA2NTI1MCwiZXhwIjoxNzk1NjAxMjUwfQ.bBKczE8BMiqTYxtjg_VH4mZCE52rIx20-_iODCnZqjc";

const getContrastColor = (hexColor) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexColor = hexColor.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

    if (!result) return '#FFFFFF';

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const parseDepartment = (departmentString) => {
    if (!departmentString) {
        return { name: 'Neznámé', color: '#808080' };
    }
    const parts = departmentString.split(';#');
    const name = parts[0];
    const color = parts[1] ? `#${parts[1].replace('#', '')}` : '#808080';
    return { name, color };
};

const parseTag = (tagString) => {
    if (!tagString || tagString.trim() === '') {
        return null;
    }

    const cleanTagString = tagString.split('|')[0];
    const parts = cleanTagString.split(';');

    if (parts.length < 3) {
        const content = parts[0] || 'Tag';
        const color = parts[1] ? `#${parts[1].replace('#', '')}` : '#808080';
        return { emoji: '', text: content, color: color, textColor: getContrastColor(color) };
    }

    const emoji = parts[0].trim();
    const text = parts[1].trim();
    const color = parts[2] ? `#${parts[2].replace('#', '')}` : '#808080';

    const textColor = getContrastColor(color);

    return { emoji, text, color, textColor };
};


const generateSocialUrl = (platform, value) => {
    if (!value) return null;
    value = value.trim();

    if (value.startsWith('http')) return value;

    switch (platform) {
        case 'instagram':
            return `https://www.instagram.com/${value.replace(/^@/, '')}`;
        case 'linkedin':
            const prefix = value.match(/^(in\/|pub\/)/i) ? '' : 'in/';
            return `https://www.linkedin.com/${prefix}${value.replace(/^\//, '')}`;
        default:
            return null;
    }
};

const DiscordCopyButton = ({ discordHandle }) => {
    const [copied, setCopied] = useState(false);

    if (!discordHandle) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(discordHandle)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Copy failed: ', err);
            });
    };

    const iconSrc = "https://cdn.simpleicons.org/discord/FFFFFF";

    return (
        <div className="relative inline-block">
            <button
                onClick={copyToClipboard}
                title={copied ? 'Zkopírováno!' : `Discord: Kliknutím zkopírovat **${discordHandle}**`}
                aria-label={`Discord účet: ${discordHandle}. Kliknutím zkopírujete.`}
                className="hover:scale-110 transition-all opacity-50 hover:opacity-100 p-0 m-0"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <img
                    src={iconSrc}
                    width="20"
                    alt="Discord"
                    style={{ filter: copied ? 'drop-shadow(0 0 5px #4CAF50)' : 'none' }}
                />
            </button>
            {copied && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap bg-funweek text-white text-xs py-0.5 px-1 rounded-sm">
                    Zkopírováno!
                </span>
            )}
        </div>
    );
};

export default function TeamPage() {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            let { data, error } = await supabase
                .from('profiles')
                .select('full_name, role, department, tag, thumbnail_image, instagram, linkedin, discord, visible_email, priority')
                .eq('visible_staff', true)
                .not('role', 'is', null)
                .order('priority', { ascending: true, nullsFirst: false })
                .order('role', { ascending: true });

            if (error) {
                setError(`Nepodařilo se načíst data týmu. Detaily: ${error.message}`);
                setLoading(false);
                return;
            }

            const mappedTeam = data.map(profile => {
                const { name: depName, color: depColor } = parseDepartment(profile.department);
                const tag = parseTag(profile.tag);

                const socials = {
                    email: profile.visible_email ? `mailto:${profile.visible_email}` : null,
                    instagram: profile.instagram,
                    linkedin: profile.linkedin,
                    discord: profile.discord,
                };
                const finalImageUrl = profile.thumbnail_image || FALLBACK_IMAGE_URL;

                return {
                    name: profile.full_name,
                    role: profile.role,
                    department: depName,
                    depColor: depColor,
                    tag: tag,
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
                <img src="/die.png" width="100" className="mb-10"/>
                <h1 className="text-4xl font-bold">Server udělal bác...</h1>
                <h2 className="text-2xl text-center">Omlouváme se, ale nemůžeme přistoupit k datům na našich serverech. Pokud chyba přetrvává, kontaktujte prosím technický tým na <a src="mailto:it@funweek.cz" className="underline cursor-pointer">it@funweek.cz</a></h2>
                <a href="/funweek/public" className="font-bold mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white ">
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
                <img src="/die.png" width="100" className="mb-10"/>
                <h1 className="text-4xl font-bold">Server vrátil null...</h1>
                <h2 className="text-2xl text-center">Omlouváme se, v tuto chvíli nemůžeme přistoupit k datům na našich serverech. Pokud tuto hlášku vidíte, o chybě už víme a pracujeme na opravě. Pro více informací kontaktujte náš technický tým na <a src="mailto:it@funweek.cz" className="underline cursor-pointer">it@funweek.cz</a>. Díky za trpělivost.</h2>
                <a href="/funweek/public" className="font-bold mt-10 px-4 py-2 rounded-lg block group bg-funweek hover:scale-95 transition-all text-white ">
                    Zpět na domovskou stránku
                </a>
            </main>
        );
    }

    const hexToRgba = (hex, alpha) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (!result) return `rgba(0, 0, 0, ${alpha})`;

        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <main className="w-full px-10 md:px-50 mt-30 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-center text-4xl mb-3 md:mb-0 md:text-5xl font-bold md:leading-15">Spojuje nás vize světa, kde se každý cítí být rovnocenný a přijatý.</h1>
                <span className="text-center text-xl px-5 md:px-25">Naše filozofie je o aktivním budování důvěry a respektu. Věříme v sílu autenticity a diverzity a zavazujeme se tyto hodnoty rozvíjet. Neomezujeme se jen na žáky základních škol – naším cílem je posílit sebevědomí a plný potenciál v každém, kdo s námi sdílí cestu.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center gap-10 mt-10 w-full">
                {teamData.map((member, index) => (
                    <div key={index}
                         className="flex p-3 bg-cover flex-col w-full items-center gap-2 border-funweek rounded-xl aspect-[2/3] justify-end"
                         style={{ backgroundImage: `url('${member.image}')` }}
                    >
                        <div className="flex flex-row items-center gap-1 flex-wrap justify-center">
                            <div className="text-sm rounded-full bg-opacity-10 text-white px-2" id="gabarito" style={{ backgroundColor: hexToRgba(member.depColor, 0.7)}}>{member.department}</div>

                            {member.tag && (
                                <div
                                    className="text-sm rounded-full bg-opacity-10 px-2 flex flex-row items-center content-center"
                                    style={{
                                        backgroundColor: hexToRgba(member.tag.color, 0.7),
                                        color: member.tag.textColor // contrast
                                    }}
                                    id="gabarito"
                                >
                                    {member.tag.emoji} {member.tag.text}
                                </div>
                            )}

                            {member?.availability && ( <div className="text-sm rounded-full bg-red-800 text-white px-2 flex flex-row items-center content-center gap-1" id="gabarito"> <img src="https://i.imgur.com/iP7i12F.png" width="10" alt="Availability icon" /> {member.availability}</div> )}
                        </div>
                        <div className="bg-funweek/70 backdrop-blur w-full rounded-xl text-white p-2 leading-none flex items-center flex-col">
                            <h1 className="text-2xl">{member.name}</h1>
                            <h1 className="text-md">{member.role}</h1>
                            <div className="mt-3">
                                <div className="flex text-white text-sm gap-2">
                                    {member.socials?.email && (<a href={member.socials.email}><img src="https://i.imgur.com/XJocfuk.png" width="20" className="hover:scale-110 transition-all opacity-50 hover:opacity-100" alt="Email" /></a>)}
                                    {member.socials?.instagram && (<a href={generateSocialUrl('instagram', member.socials.instagram)} target="_blank" rel="noopener noreferrer" title={`Instagram: ${member.socials.instagram}`}><img src="https://cdn.simpleicons.org/instagram/FFFFFF" width="20" className="hover:scale-110 transition-all opacity-50 hover:opacity-100" alt="Instagram" /></a>)}
                                    {member.socials?.linkedin && (<a href={generateSocialUrl('linkedin', member.socials.linkedin)} target="_blank" rel="noopener noreferrer" title={`LinkedIn: ${member.socials.linkedin}`}><img src="https://i.imgur.com/Hap36Ei.png" width="20" className="hover:scale-110 transition-all opacity-50 hover:opacity-100" alt="LinkedIn" /></a>)}
                                    {member.socials?.discord && (<DiscordCopyButton discordHandle={member.socials.discord} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}