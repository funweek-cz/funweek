"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Trash2, Loader2, Image } from 'lucide-react';

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function ThumbnailControls({ uid, thumbnailUrl, onUpload, onRemove, fileInputRef }) {
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(false);

    const uploadThumbnail = async (event) => {
        try {
            setUploading(true);

            if (!uid) {
                throw new Error('User ID (uid) is missing. Cannot proceed with upload.');
            }

            const file = event.target.files[0];
            if (!file) {
                setUploading(false);
                return;
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${uid}-thumbnail-${Date.now()}-${generateRandomString(6)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('thumbnails') // ZDE JE SPRÁVNÝ BUCKET 'thumbnails'
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data: publicUrlData } = supabase.storage
                .from('thumbnails')
                .getPublicUrl(filePath);

            const newThumbnailUrl = publicUrlData.publicUrl;

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ thumbnail_image: newThumbnailUrl })
                .eq('id', uid);

            if (updateError) {
                await supabase.storage.from('thumbnails').remove([filePath]).catch(() => {});
                throw updateError;
            }

            if (thumbnailUrl) {
                try {
                    const oldFileName = thumbnailUrl.substring(thumbnailUrl.lastIndexOf('/') + 1);
                    if (oldFileName && oldFileName.length > 0 && oldFileName !== 'null') {
                        await supabase.storage.from('thumbnails').remove([oldFileName]);
                    }
                } catch (e) {
                    console.warn("Nepodařilo se smazat starý soubor z úložiště:", e.message);
                }
            }

            onUpload(newThumbnailUrl);

        } catch (error) {
            console.error('Chyba při nahrávání thumbnailu:', error.message);

        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    };

    // Funkce pro odstranění thumbnailu
    const removeThumbnail = async () => {
        setRemoving(true);

        try {
            if (!uid || !thumbnailUrl) {
                throw new Error("Chybí ID uživatele nebo URL thumbnailu.");
            }

            // 1. Smazání z databáze
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ thumbnail_image: null })
                .eq('id', uid);

            if (updateError) {
                throw updateError;
            }

            // 2. Smazání souboru z úložiště
            const fileName = thumbnailUrl.substring(thumbnailUrl.lastIndexOf('/') + 1);
            if (fileName && fileName.length > 0 && fileName !== 'null') {
                const { error: removeError } = await supabase.storage
                    .from('thumbnails')
                    .remove([fileName]);

                if (removeError) {
                    console.warn("Nepodařilo se smazat soubor z úložiště (možná byl smazán dříve):", removeError.message);
                }
            }

            onRemove();

        } catch (error) {
            console.error('Chyba při odstraňování thumbnailu:', error.message);

        } finally {
            setRemoving(false);
        }
    };


    return (
        <div className="flex items-center space-x-4">
            <input
                ref={fileInputRef}
                style={{
                    visibility: 'hidden',
                    position: 'absolute',
                }}
                type="file"
                id="thumbnail-upload"
                accept="image/*"
                onChange={uploadThumbnail}
                disabled={uploading || removing}
            />

            <div className="w-20 h-30 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-300 flex-shrink-0">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x120/cccccc/333333?text=Thumb+Err"; }}
                    />
                ) : (
                    <Image className="w-8 h-12 text-gray-400" />
                )}
            </div>

            <div className="flex space-x-2">
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
                        uploading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-funweek text-white hover:bg-funweek/80'
                    }`}
                    disabled={uploading || removing}
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Nahrávám...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" /> {thumbnailUrl ? 'Změnit obrázek' : 'Nahrát obrázek'}
                        </>
                    )}
                </button>

                {thumbnailUrl && (
                    <button
                        type="button"
                        onClick={removeThumbnail}
                        className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
                            removing ? 'bg-red-200 text-red-500 cursor-not-allowed' : 'bg-white text-red-600 border-red-600 hover:bg-red-50'
                        }`}
                        disabled={uploading || removing}
                    >
                        {removing ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mažu...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4 mr-2" /> Odstranit
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}