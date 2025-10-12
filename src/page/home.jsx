import { Box, Heading, Text, Grid, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { getTopAnime, getNowSeasonAnime, getUpcomingAnime, getTopManga } from "../api-jikan/Jikanjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [upcomingAnimes, setUpcomingAnimes] = useState([]);
  const [latestMangas, setLatestMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi delay untuk rate limit
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const top = await getTopAnime();
        setTopAnimes(top.slice(0, 7));

        await delay(750); // delay 1 detik sebelum request berikutnya
        try {
          const season = await getNowSeasonAnime();
          setSeasonAnimes(season);
        } catch {
          setSeasonAnimes([]);
        }

        await delay(1000);
        try {
          const upcoming = await getUpcomingAnime();
          setUpcomingAnimes(upcoming.slice(0, 25));
        } catch {
          setUpcomingAnimes([]);
        }

        await delay(1250);
        try {
          const topManga = await getTopManga();
          const releasedManga = topManga.filter(
            (m) => m.status === "Publishing" || m.status === "Finished"
          );
          setLatestMangas(releasedManga.slice(0, 12)); // tampilkan beberapa saja
        } catch {
          setLatestMangas([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderAnimeBox = (anime) => (
    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        _hover={{ transform: "scale(1.05)", boxShadow: "lg", transition: "0.3s" }}
        w="200px"
        h="350px"
        bgGradient="linear(to-b, blue.50, white)"
      >
        <Box
          position="absolute"
          top={2}
          right={2}
          background="purple.600"
          color="white"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
          zIndex={1}
        >
          ⭐ {anime.score || "N/A"}
        </Box>

        <Image
          src={anime.images.jpg.image_url}
          alt={anime.title}
          width="100%"
          height="250px"
          objectFit="cover"
        />
        <Box p={3} h="100px">
          <Text fontWeight="bold" fontSize="md" noOfLines={2} color="blue.800">
            {anime.title}
          </Text>
        </Box>
      </Box>
    </Link>
  );

  const renderMangaBox = (manga) => (
    <Link key={manga.mal_id} to={`/manga/${manga.mal_id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        _hover={{ transform: "scale(1.05)", boxShadow: "lg", transition: "0.3s" }}
        w="200px"
        h="350px"
        bgGradient="linear(to-b, green.50, white)"
      >
        <Box
          position="absolute"
          top={2}
          right={2}
          background="green.600"
          color="white"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
          zIndex={1}
        >
          ⭐ {manga.score || "N/A"}
        </Box>

        <Image
          src={manga.images.jpg.image_url}
          alt={manga.title}
          width="100%"
          height="250px"
          objectFit="cover"
        />
        <Box p={3} h="100px">
          <Text fontWeight="bold" fontSize="md" noOfLines={2} color="green.800">
            {manga.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {manga.status}
          </Text>
        </Box>
      </Box>
    </Link>
  );

  return (
    <Box>
      {/* Top Anime */}
      <Box p={8} bg="gray.50" borderRadius="lg" mb={8}>
        <Heading mb={6} color="teal.600">🔥 Top Anime</Heading>
        <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
          {topAnimes.map(renderAnimeBox)}
        </Grid>
      </Box>

      {/* Anime Musim Ini */}
      <Box p={8} bg="gray.100" borderRadius="lg" mb={8}>
        <Heading mb={6} color="purple.600">🎬 Anime Musim Ini</Heading>
        <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
          {loading ? (
            <Text fontStyle="italic" color="gray.500">Loading anime musim ini...</Text>
          ) : seasonAnimes.length > 0 ? (
            seasonAnimes.map(renderAnimeBox)
          ) : (
            <Text fontStyle="italic" color="gray.500">
              Gagal mengambil anime musim ini atau terlalu banyak request.
            </Text>
          )}
        </Grid>
      </Box>

      {/* Coming Soon Anime */}
      <Box p={8} bg="gray.50" borderRadius="lg" mb={8}>
        <Heading mb={6} color="orange.600">⏳ Coming Soon Anime</Heading>
        <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
          {upcomingAnimes.map(renderAnimeBox)}

          <Box
            w="200px"
            h="350px"
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="orange.100"
            cursor="pointer"
            _hover={{ bg: "orange.200", boxShadow: "lg", transition: "0.3s" }}
            onClick={() => navigate("/comingsoon")}
          >
            <Text fontWeight="bold" color="orange.800">
              See More →
            </Text>
          </Box>
        </Grid>
      </Box>

      {/* Popular Ongoing Manga */}
      <Box p={8} bg="gray.100" borderRadius="lg" mb={8}>
        <Heading mb={6} color="green.600">📖 Popular Ongoing Manga</Heading>
        <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
          {latestMangas.map(renderMangaBox)}

          {/* Box redirect ke MangaBrowse */}
          <Box
            w="200px"
            h="350px"
            borderWidth="1px"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="green.100"
            cursor="pointer"
            _hover={{ bg: "green.200", boxShadow: "lg", transition: "0.3s" }}
            onClick={() => navigate("/latest-manga")}
          >
            <Text fontWeight="bold" color="green.800">
              See More →
            </Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
