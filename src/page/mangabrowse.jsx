import { Box, Heading, Text, Grid, Image, Spinner } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getTopManga } from "../api-jikan/Jikanjs";

export default function MangaBrowse() {
  const [mangas, setMangas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  // Fungsi delay untuk rate limit
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchMangas = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await getTopManga(pageNumber);
      const ongoingManga = data.filter((m) => m.status === "Publishing");
      if (ongoingManga.length === 0) {
        setHasMore(false);
      } else {
        setMangas((prev) => [...prev, ...ongoingManga]);
      }
      await delay(1000); // delay 1 detik antar request
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangas(page);
  }, [page]);

  // Infinite scroll observer
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(prev => prev + 1); // ini akan panggil page 2, 3, dst
      }
    },
    { threshold: 1 }
  );

  if (loader.current) observer.observe(loader.current);

  return () => {
    if (loader.current) observer.unobserve(loader.current);
  };
}, [hasMore, loading]);

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
    <Box p={8}>
      <Heading mb={6} color="green.600">📖 Popular Ongoing Manga</Heading>
      <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
        {mangas.map(renderMangaBox)}

        {/* "See More" block jika masih ada */}
        {hasMore && !loading && (
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
            onClick={() => setPage((prev) => prev + 1)}
          >
            <Text fontWeight="bold" color="green.800">
              See More →
            </Text>
          </Box>
        )}
      </Grid>

      {loading && (
        <Box textAlign="center" mt={4}>
          <Spinner size="lg" />
        </Box>
      )}
      <div ref={loader} />
    </Box>
  );
}
