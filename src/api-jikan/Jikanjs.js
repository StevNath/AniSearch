// src/api/api-jikan.js
// API helper untuk mengambil data dari Jikan API
// Dokumentasi resmi: https://docs.api.jikan.moe/

const BASE_URL = "https://api.jikan.moe/v4";

/**
 * Cari anime
 * @param {string} query
 * @returns {Array} list anime
 */
export async function searchAnime(query) {
  try {
    const res = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Error fetching anime:", err);
    return [];
  }
}

/**
 * Cari manga
 * @param {string} query
 * @returns {Array} list manga
 */
export async function searchManga(query) {
  try {
    const res = await fetch(`${BASE_URL}/manga?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Error fetching manga:", err);
    return [];
  }
}
/**
 * 📄 Mendapatkan detail anime berdasarkan ID
 * @param {number} id - ID anime
 */
export async function getAnimeDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/anime/${id}/full`);
    if (!response.ok) throw new Error("Gagal mengambil detail anime");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`getAnimeDetail Error (ID: ${id}):`, error);
    return null;
  }
}

/**
 * 🔥 Mendapatkan daftar anime yang sedang tayang (season sekarang)
 */
export async function getNowSeasonAnime() {
  try {
    const response = await fetch(`${BASE_URL}/seasons/now`);
    if (!response.ok) throw new Error("Gagal mengambil anime musim sekarang");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("getNowSeasonAnime Error:", error);
    return [];
  }
}

export async function getUpcomingAnime() {
  const res = await fetch("https://api.jikan.moe/v4/anime?status=upcoming&limit=25");
  const data = await res.json();
  return data.data; // ini array anime
}
export async function getTopAnime() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Ambil daftar genre anime
export async function getAnimeGenres() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/genres/anime");
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    return data.data; // Jikan API v4, datanya ada di data.data
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
}



// Ambil daftar genre manga
export async function getMangaGenres() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/genres/manga");
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    return data.data; // Jikan API v4, datanya ada di data.data
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
}



// Ambil anime berdasarkan genre ID
export async function searchAnimeByGenre(genreName, page = 1) {
  try {
    // Ambil semua genre
    const genreRes = await fetch(`${BASE_URL}/genres/anime`);
    const genreData = await genreRes.json();
    const genre = genreData.data.find(
      g => g.name.toLowerCase() === genreName.toLowerCase()
    );
    if (!genre) return { data: [], pagination: { has_next_page: false } };

    // Ambil anime by genre id, urut dari terbaru
    const res = await fetch(
      `${BASE_URL}/anime?genres=${genre.mal_id}&page=${page}&order_by=start_date&sort=desc`
    );
    const data = await res.json();
    return { data: data.data, pagination: data.pagination };
  } catch (err) {
    console.error("searchAnimeByGenre Error:", err);
    return { data: [], pagination: { has_next_page: false } };
  }
}

export async function searchMangaByGenre(genreName, page = 1) {
  try {
    const genreRes = await fetch(`${BASE_URL}/genres/manga`);
    const genreData = await genreRes.json();
    const genre = genreData.data.find(
      g => g.name.toLowerCase() === genreName.toLowerCase()
    );
    if (!genre) return { data: [], pagination: { has_next_page: false } };

    const res = await fetch(
      `${BASE_URL}/manga?genres=${genre.mal_id}&page=${page}&order_by=start_date&sort=desc`
    );
    const data = await res.json();
    return {
      data: data.data.map(item => ({ ...item, searchType: "Manga" })),
      pagination: data.pagination || { has_next_page: false }
    };
  } catch (err) {
    console.error("searchMangaByGenre Error:", err);
    return { data: [], pagination: { has_next_page: false } };
  }
}

// src/api-jikan/Jikanjs.js
export async function getLatestManga() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/manga?order_by=start_date&sort=desc&limit=50");
    const data = await response.json();
    return data.data; // array manga terbaru
  } catch (error) {
    console.error("Gagal mengambil latest manga:", error);
    return [];
  }
}



export async function getTopManga(page = 1) {
  const response = await fetch(`https://api.jikan.moe/v4/top/manga?page=${page}`);
  const data = await response.json();
  return data.data; // pastikan ambil data.data
}