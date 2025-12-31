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
        if (!response.ok) {
            console.error(`Error fetching top anime: ${response.status} ${response.statusText}`);
            throw new Error("Gagal mengambil top anime");
        }
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
        if (!response.ok) {
            console.error(`Error fetching season now: ${response.status} ${response.statusText}`);
            throw new Error("Gagal mengambil anime season sekarang");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("SeasonNow Error:", error);
        return [];
    }
}

// ambil data id untuk anime details
export async function getAnimeDetails(id) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return null;
  }
}

// ambil data schedule anime
export async function getAnimeSchedules() {
    try {
        const response = await fetch(`${BASE_URL}/schedules`);
        if (!response.ok) {
            console.error(`Error fetching schedules: ${response.status} ${response.statusText}`);
            throw new Error("Gagal mengambil jadwal anime");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Schedules Error:", error);
        return [];
    }
}
// Ambil data detail manga berdasarkan ID
export async function getMangaDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/manga/${id}/full`);
    if (!response.ok) {
        throw new Error("Gagal mengambil detail manga");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return null;
  }
}
// Top Manga
export async function getTopManga() {
    try {
        const response = await fetch(`${BASE_URL}/top/manga`);
        if (!response.ok) {
            console.error(`Error fetching top manga: ${response.status} ${response.statusText}`);
            throw new Error("Gagal mengambil top manga");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("TopManga Error:", error);
        return [];
    }
}

// Ambil data manga yang sedang Publishing
export async function getPublishingManga() {
    try {
        // filter=publishing akan mengambil manga yang statusnya masih jalan
        const response = await fetch(`${BASE_URL}/top/manga?filter=publishing`);
        if (!response.ok) {
            console.error(`Error fetching publishing manga: ${response.status}`);
            throw new Error("Gagal mengambil publishing manga");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("PublishingManga Error:", error);
        return [];
    }
}