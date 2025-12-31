import { Box, Container, Grid, Image, Heading, Text, Badge, Stack, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMangaDetails } from "../API_JIKAN_V4/jikanv4";

export default function MangaDetails() {
  const { id } = useParams(); 
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Memanggil API menggunakan ID dari parameter URL
        const data = await getMangaDetails(id);
        setManga(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching manga details:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Tampilan saat sedang memuat data (Loading)
  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  // Tampilan jika data tidak ditemukan
  if (!manga) {
    return (
      <Box p={10} textAlign="center">
        <Text fontSize="xl">Data Manga tidak ditemukan.</Text>
      </Box>
    );
  }

  // Tampilan Utama Detail Manga
  return (
    <Box mb={10}>
      {/* Bagian Header Judul */}
      <Box bg="blue.600" color="white" py={10} px={5}>
        <Container maxW="container.xl">
          <Heading as="h1" size="2xl">{manga.title}</Heading>
          {manga.title_japanese && (
            <Text fontSize="xl" mt={2} opacity={0.8}>{manga.title_japanese}</Text>
          )}
        </Container>
      </Box>

      <Container maxW="container.xl" py={10}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10}>
          {/* Kolom Kiri: Gambar Sampul & Info Statistik */}
          <Box>
            <Image 
              src={manga.images?.jpg?.large_image_url} 
              alt={manga.title} 
              borderRadius="lg" 
              shadow="2xl" 
              w="100%"
              objectFit="cover"
            />
            
            <Stack mt={5} spacing={3} p={5} borderWidth="1px" borderRadius="md" bg="gray.50">
              <Flex justify="space-between">
                <Text fontWeight="bold">Score:</Text>
                <Badge colorScheme="green" fontSize="1em">⭐ {manga.score || "N/A"}</Badge>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Rank:</Text>
                <Text>#{manga.rank || "-"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Popularity:</Text>
                <Text>#{manga.popularity || "-"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Status:</Text>
                <Badge colorScheme={manga.status === "Publishing" ? "green" : "red"}>
                  {manga.status}
                </Badge>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Type:</Text>
                <Text>{manga.type}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Chapters:</Text>
                <Text>{manga.chapters || "?"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Volumes:</Text>
                <Text>{manga.volumes || "?"}</Text>
              </Flex>
            </Stack>
          </Box>

          {/* Kolom Kanan: Sinopsis, Genre, Author */}
          <Box>
            <Heading size="lg" mb={4} borderBottom="2px solid" borderColor="blue.200" pb={2}>
              Synopsis
            </Heading>
            <Text fontSize="lg" lineHeight="tall" textAlign="justify" mb={6}>
              {manga.synopsis || "No synopsis available."}
            </Text>

            <Heading size="md" mb={3}>Genres</Heading>
            <Stack direction="row" spacing={2} wrap="wrap" mb={6}>
              {manga.genres && manga.genres.map((genre) => (
                <Badge key={genre.mal_id} colorScheme="purple" px={3} py={1} borderRadius="full">
                  {genre.name}
                </Badge>
              ))}
            </Stack>

            <Heading size="md" mb={3}>Authors</Heading>
            <Stack direction="row" spacing={4}>
              {manga.authors && manga.authors.map((author) => (
                <Text key={author.mal_id} fontWeight="bold" color="blue.600">
                  {author.name}
                </Text>
              ))}
            </Stack>

            {/* Tombol Eksternal (Opsional) */}
            {manga.url && (
              <Box mt={8}>
                <Text fontSize="sm" color="gray.500">
                  More info at: <a href={manga.url} target="_blank" rel="noreferrer" style={{color: "blue"}}>MyAnimeList</a>
                </Text>
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}