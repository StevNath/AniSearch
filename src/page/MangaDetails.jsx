import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Grid, Image, Link, AspectRatio } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getMangaDetails } from "../API_JIKAN_V4/jikanv4";

const MotionBox = motion(Box);

export default function MangaDetails() {
  const { id } = useParams();
  const [manga, setManga] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Panggil API Manga
        const data = await getMangaDetails(id);
        if (data) {
          setManga(data);
          setError(null);
        } else {
          setError("Manga tidak ditemukan");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data manga");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
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

  if (error || !manga) {
    return (
      <Box
        bg="white"
        color="red.500"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg">{error || "Manga tidak ditemukan"}</Text>
      </Box>
    );
  }

  return (
    <MotionBox
      bg="white"
      color="gray.800"
      minH="100vh"
      p={{ base: 4, md: 8 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Grid
        templateColumns={{ base: "1fr", md: "280px 1fr" }}
        gap={8}
        maxW="1000px"
        mx="auto"
        alignItems="flex-start"
      >
        {/* Gambar poster */}
        <MotionBox
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={manga.images?.jpg?.large_image_url}
            alt={manga.title}
            borderRadius="md"
            shadow="md"
            w="100%"
          />
          
          {/* Manga tidak punya trailer */}
        </MotionBox>

        {/* Detail Manga */}
        <MotionBox
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Heading size="lg" mb={1}>
            {manga.title}
          </Heading>
          <Text fontSize="md" color="gray.600" mb={4}>
            {manga.title_japanese || "-"}
          </Text>

          <Grid templateColumns="auto 1fr" gap={1} mb={4}>
            <Text fontWeight="bold">Type:</Text>
            <Text>{manga.type || "-"}</Text>

            {/* Chapters & Volumes */}
            <Text fontWeight="bold">Chapters:</Text>
            <Text>{manga.chapters || "-"}</Text>

            <Text fontWeight="bold">Volumes:</Text>
            <Text>{manga.volumes || "-"}</Text>

            <Text fontWeight="bold">Status:</Text>
            <Text>{manga.status || "-"}</Text>

            <Text fontWeight="bold">Score:</Text>
            <Text>{manga.score ? `${manga.score} / 10` : "N/A"}</Text>

            {/* Published */}
            <Text fontWeight="bold">Published:</Text>
            <Text>{manga.published?.string || "-"}</Text>

            {/* Authors */}
            <Text fontWeight="bold">Authors:</Text>
            <Text>{manga.authors?.map(author => author.name).join(", ") || "-"}</Text>

            {/* Genres sebagai badge berwarna sama dengan Anime */}
            <Text fontWeight="bold">Genres:</Text>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {manga.genres?.map((genre, index) => {
                const colors = ["#E53E3E", "#3182CE", "#38A169", "#D69E2E", "#805AD5", "#DD6B20"];
                const color = colors[index % colors.length];

                return (
                  <MotionBox
                    key={genre.mal_id}
                    px={3}
                    py={1}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={color}
                    bg={`${color}20`}
                    color={color}
                    fontWeight="bold"
                    fontSize="sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {genre.name}
                  </MotionBox>
                );
              })}
            </Box>
          </Grid>

          <Heading size="md" mb={2}>Sinopsis:</Heading>
          <Text fontSize="md" color="gray.700" lineHeight="1.7">
            {manga.synopsis || "Sinopsis tidak tersedia."}
          </Text>

          {manga.url && (
            <Box mt={4}>
              <Link href={manga.url} color="blue.500" isExternal>
                Lihat di MyAnimeList
              </Link>
            </Box>
          )}
        </MotionBox>
      </Grid>
    </MotionBox>
  );
}