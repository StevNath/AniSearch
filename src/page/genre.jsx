import { useEffect, useState } from "react";
import { Box, Heading, Grid, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getAnimeGenres, getMangaGenres } from "../api-jikan/Jikanjs";

export default function Genre() {
  const [animeGenres, setAnimeGenres] = useState([]);
  const [mangaGenres, setMangaGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      const [animeData, mangaData] = await Promise.all([
        getAnimeGenres(),
        getMangaGenres(),
      ]);
      setAnimeGenres(animeData);
      setMangaGenres(mangaData);
    }
    fetchGenres();
  }, []);

  return (
    <Box p={8}>
      <VStack align="start" spacing={8} w="100%">
        {/* Anime Grid */}
        <Box w="100%">
          <Heading size="lg" mb={4}>
            Genre Anime
          </Heading>
          {animeGenres.length === 0 ? (
            <Text>Tidak ada genre Anime.</Text>
          ) : (
            <Grid templateColumns="repeat(auto-fit, minmax(140px, auto))" gap={4}>
              {animeGenres.map((genre) => (
                <Button
                  key={genre.mal_id}
                  colorScheme="teal"
                  height="50px"
                  onClick={() =>
                    navigate(`/anime/genre/${genre.name.toLowerCase()}`)
                  }
                >
                  {genre.name}
                </Button>
              ))}
            </Grid>
          )}
        </Box>

        {/* Manga Grid */}
        <Box w="100%">
          <Heading size="lg" mb={4}>
            Genre Manga
          </Heading>
          {mangaGenres.length === 0 ? (
            <Text>Tidak ada genre Manga.</Text>
          ) : (
            <Grid templateColumns="repeat(auto-fit, minmax(140px, auto))" gap={4}>
              {mangaGenres.map((genre) => (
                <Button
                  key={genre.mal_id}
                  colorScheme="orange"
                  height="50px"
                  onClick={() =>
                    navigate(`/manga/genre/${genre.name.toLowerCase()}`)
                  }
                >
                  {genre.name}
                </Button>
              ))}
            </Grid>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
