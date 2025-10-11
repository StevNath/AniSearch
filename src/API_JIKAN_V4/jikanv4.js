import { param } from 'framer-motion/client';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * 🔍 Mencari anime berdasarkan query
 * @param {string} query - Kata kunci pencarian anime
 */
export async function searchAnime(query) {
  try {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Gagal mencari anime");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("searchAnime Error:", error);
    return [];
  }
}

// ambil data top anime
export async function getTopAnime() {
    try {
        const response = await fetch(`${BASE_URL}/top/anime`);
        if (!response.ok) throw new Error("Gagal mengambil top anime");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("topAnime Error:", error);
        return [];
    }
}

// ambil data anime season sekarang

export async function getSeasonNowAnime() {
    try {
        const response = await fetch(`${BASE_URL}/seasons/now`);
        if (!response.ok) throw new Error("Gagal mengambil anime season sekarang");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("SeasonNow Error:", error);
        return [];
    }
}