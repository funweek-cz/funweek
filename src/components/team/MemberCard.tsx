import React from "react";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import DiscordCopyButton from "@/components/team/DiscordCopyButton";
import { BsStars } from "react-icons/bs";

const MemberCard = ({
  member,
}: {
  member: {
    image?: string;
    department?: string;
    depColor?: string;
    tagColor?: string;
    tagEmoji?: string;
    tagText?: string;
    name?: string;
    role?: string;
    socials?: {
      email?: string | null;
      instagram?: string | null;
      linkedin?: string | null;
      discord?: string | null;
    };
  };
}) => {
  return (
    <article
      className="flex p-3 bg-cover flex-col w-full items-center gap-2 border-funweek rounded-xl aspect-2/3 justify-end"
      style={{ backgroundImage: `url('${member.image}')` }}
    >
      <div className="flex flex-row items-center gap-1">
        <div
          className="text-sm rounded-full bg-opacity-10 text-white px-2"
          id="gabarito"
          style={{ backgroundColor: `${member.depColor}b2` }}
        >
          {member.department}
        </div>
        {member?.tagText && (
          <div
            className="text-sm rounded-full bg-opacity-10 text-white px-2"
            id="gabarito"
            style={{ backgroundColor: `${member.tagColor}b2` }}
          >
            <div className="flex gap-1">
              <span>{member.tagEmoji}</span>
              <span>{member.tagText}</span>
            </div>
          </div>
        )}
      </div>
      <div className="bg-funweek/70 backdrop-blur w-full rounded-xl text-white p-2 leading-none flex items-center flex-col">
        <h1 className="text-2xl">{member.name}</h1>
        <h1 className="text-md">{member.role}</h1>
        <div className="mt-3">
          <div className="flex text-white text-sm gap-2">
            {member.socials?.email && (
              <Link href={member.socials.email}>
                <IoIosMail
                  size={26}
                  className="hover:scale-110 transition-all opacity-50 hover:opacity-100"
                />
              </Link>
            )}
            {member.socials?.instagram && (
              <Link
                href={`https://www.instagram.com/${member.socials.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Instagram: ${member.socials.instagram}`}
              >
                <IoLogoInstagram
                  size={24}
                  className={
                    "hover:scale-110 transition-all opacity-50 hover:opacity-100"
                  }
                />
              </Link>
            )}
            {member.socials?.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${member.socials.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`LinkedIn: ${member.socials.linkedin}`}
              >
                <IoLogoLinkedin
                  size={24}
                  className={
                    "hover:scale-110 transition-all opacity-50 hover:opacity-100"
                  }
                />
              </a>
            )}
            {member.socials?.discord && (
              <DiscordCopyButton nickname={member.socials.discord} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MemberCard;
