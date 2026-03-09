"use client";
import React, { useState } from "react";
import { SiDiscord } from "react-icons/si";

const DiscordCopyButton = ({ nickname }: { nickname: string }) => {
  const [copied, setCopied] = useState(false);

  if (!nickname) return null;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(nickname)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Copy failed: ", err);
      });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={copyToClipboard}
        title={
          copied
            ? "Zkopírováno!"
            : `Discord: Kliknutím zkopírovat **${nickname}**`
        }
        aria-label={`Discord účet: ${nickname}. Kliknutím zkopírujete.`}
        className="hover:scale-110 transition-all opacity-50 hover:opacity-100 p-0 m-0"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <SiDiscord
          size={24}
          style={{ filter: copied ? "drop-shadow(0 0 5px #4CAF50)" : "none" }}
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

export default DiscordCopyButton;
