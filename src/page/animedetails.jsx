import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Grid, Image, Link, AspectRatio } from "@chakra-ui/react";
import { getAnimeDetails } from "../API_JIKAN_V4/jikanv4";

export default function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const data = await getAnimeDetails(id);
        if (data) {
          setAnime(data);
          setError(null);
        } else {
          setError("Anime tidak ditemukan");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data anime");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        bg="white"
        color="gray.700"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg">Loading...</Text>
      </Box>
    );
  }

  if (error || !anime) {
    return (
      <Box
        bg="white"
        color="red.500"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg">{error || "Anime tidak ditemukan"}</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" color="gray.800" minH="100vh" p={{ base: 4, md: 8 }}>
      <Grid
        templateColumns={{ base: "1fr", md: "280px 1fr" }}
        gap={8}
        maxW="1000px"
        mx="auto"
        alignItems="flex-start"
      >
        {/* Gambar poster */}
        <Box>
          <Image
            src={anime.images?.jpg?.large_image_url}
            alt={anime.title}
            borderRadius="md"
            shadow="md"
            w="100%"
          />
    
    {/* Trailernya yach */}
{anime.trailer?.youtube_id && ( 
  <Box mt={4}>
    <Heading size="sm" mb={2}>Trailer:</Heading>
    <AspectRatio ratio={16 / 9}>
      <iframe
        // di embed yach sayang (>w<) biar bisa langsung nonton sama minim bug
        src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
        title={`${anime.title} Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        style={{ border: 0 }} 
      />
    </AspectRatio>
  </Box>
)}
        </Box>

        {/* Detail anime */}
        <Box>
          <Heading size="lg" mb={1}>
            {anime.title}
          </Heading>
          <Text fontSize="md" color="gray.600" mb={4}>
            {anime.title_japanese || "-"}
          </Text>

          <Grid templateColumns="auto 1fr" gap={1} mb={4}>
            <Text fontWeight="bold">Type:</Text>
            <Text>{anime.type || "-"}</Text>

            <Text fontWeight="bold">Episodes:</Text>
            <Text>{anime.episodes || "-"}</Text>

            <Text fontWeight="bold">Status:</Text>
            <Text>{anime.status || "-"}</Text>

            <Text fontWeight="bold">Score:</Text>
            <Text>{anime.score ? `${anime.score} / 10` : "N/A"}</Text>

            <Text fontWeight="bold">Duration:</Text>
            <Text>{anime.duration || "-"}</Text>

            <Text fontWeight="bold">Season:</Text>
            <Text>{anime.season ? `${anime.season} ${anime.year || ""}` : "-"}</Text>

            <Text fontWeight="bold">Studio:</Text>
            <Text>{anime.studios?.map(studio => studio.name).join(", ") || "-"}</Text>

            <Text fontWeight="bold">Genres:</Text>
            <Text>{anime.genres?.map(genre => genre.name).join(", ") || "-"}</Text>
          </Grid>

          <Heading size="md" mb={2}>Sinopsis:</Heading>
          <Text fontSize="md" color="gray.700" lineHeight="1.7">
            {anime.synopsis || "Sinopsis tidak tersedia."}
          </Text>

          {/* Link ke MyAnimeList */}
          {anime.url && (
            <Box mt={4}>
              <Link href={anime.url} color="blue.500" isExternal>
                Lihat di MyAnimeList
              </Link>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
