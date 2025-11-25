'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/supabaseClient';
import { CircleUserRound } from "lucide-react";

export default function ProfileDropdown({ user, scrolled }) {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const initial = fullName ? fullName[0].toUpperCase() : '?';

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && window.innerWidth < 1024 && event.target.closest('.profile-dropdown-container') === null) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('avatar_url, full_name')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (data?.full_name) {
                    setFullName(data.full_name);
                }

                if (data?.avatar_url) {
                    if (data.avatar_url.startsWith('http')) {
                        setAvatarUrl(data.avatar_url);
                    } else {
                        const { data: urlData } = supabase.storage
                            .from('pfp')
                            .getPublicUrl(data.avatar_url);
                        setAvatarUrl(urlData.publicUrl);
                    }
                }
            } catch (err) {
                console.error('Chyba při načítání profilu:', err);
            } finally {
                setLoading(false);
            }
        }

        if (user?.id) {
            loadProfile();
        }
    }, [user?.id]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
        setIsOpen(false);
    };

    return (
        <div className="relative group profile-dropdown-container">
            <button
                onClick={() => window.innerWidth < 1024 && setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                type="button"
                id="gabarito"
                className={`w-9 h-9 rounded-full content-center text-center font-bold text-sm overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none ${
                    scrolled ? 'bg-funweek text-white border-1 border-white' : 'bg-funweek text-white'
                }`}
            >
                {loading ? (
                    <span>{initial}</span>
                ) : avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={() => setAvatarUrl(null)}
                    />
                ) : (
                    <span>{initial}</span>
                )}
            </button>

            <div className={`absolute top-full right-0 mt-2 bg-funweek/90 rounded-xl border border-white/20 shadow-2xl min-w-[200px] transition-all duration-300 p-2 z-20 backdrop-blur-lg ${
                isOpen
                    ? 'lg:opacity-0 lg:invisible translate-y-0 opacity-100 visible'
                    : 'lg:opacity-0 lg:invisible -translate-y-2 opacity-0 invisible'
            }
            ${
                'lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:opacity-0 lg:invisible lg:-translate-y-2'
            }
            `}>
                <div className="font-semibold text-funweek bg-white rounded-md px-4 py-2 text-sm mb-1 flex flex-row items-center gap-1">
                    <CircleUserRound width="17"/>
                    <span className="text-sm">{fullName}</span>
                </div>
                <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block font-semibold text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all whitespace-nowrap"
                >
                    Můj profil
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full text-left block font-semibold text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all whitespace-nowrap mt-1"
                >
                    Odhlásit se
                </button>
            </div>
        </div>
    );
}