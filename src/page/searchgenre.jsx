import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Heading, Image, Text, Flex, VStack, Spinner } from "@chakra-ui/react";
import { searchAnimeByGenre } from "../api-jikan/Jikanjs";

export default function SearchAnimeGenre() {
  const { genreName } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const loader = useRef(null);

  const fetchAnime = async (pageNum, reset = false) => {
    if (reset) setLoading(true);
    try {
      const result = await searchAnimeByGenre(genreName, pageNum);
      // pastikan data adalah anime, tidak ada manga
      setAnimeList(prev => reset ? result.data : [...prev, ...result.data]);
      setHasNext(result.pagination.has_next_page);
    } catch (err) {
      console.error(err);
    } finally {
      if (reset) setLoading(false);
    }
  };

  // Reset & fetch saat genre berubah
  useEffect(() => {
    setAnimeList([]);
    setPage(1);
    fetchAnime(1, true);
  }, [genreName]);

  // Fetch halaman selanjutnya (infinite scroll)
  useEffect(() => {
    if (page === 1) return; // sudah fetch di reset
    fetchAnime(page);
  }, [page]);

  // Intersection Observer untuk infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasNext, loading]);

  const renderAnimeBox = (anime) => (
    <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}> {/* selalu ke animedetail */}
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        _hover={{ transform: "scale(1.03)", transition: "0.2s", boxShadow: "md" }}
        bg="white"
        p={2}
        w="200px"
        h="300px"
        display="flex"
        flexDirection="column"
        cursor="pointer"
        position="relative"
      >
        <Box
          position="absolute"
          top={2}
          right={2}
          background="blackAlpha.700"
          color="white"
          px={2}
          py={0.5}
          borderRadius="md"
          fontSize="xs"
          fontWeight="bold"
          zIndex={1}
        >
          ⭐ {anime.score || "N/A"}
        </Box>

        <Box h="160px" w="100%" overflow="hidden" mb={2}>
          <Image
            src={anime.images?.jpg?.image_url || ""}
            alt={anime.title}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>

        <VStack align="start" spacing={1} flex="1">
          <Text fontWeight="bold" noOfLines={2} fontSize="sm">{anime.title}</Text>
        </VStack>
      </Box>
    </Link>
  );

  return (
    <Box p={8}>
      <Heading mb={4}>Hasil Anime Genre: {genreName}</Heading>

      <Flex flexWrap="wrap" justify="center" gap={4}>
        {animeList.map(renderAnimeBox)}
      </Flex>

      {loading && (
        <Box textAlign="center" mt={4}>
          <Spinner size="lg" />
        </Box>
      )}

      {/* loader untuk infinite scroll */}
      <div ref={loader} />
    </Box>
  );
}
