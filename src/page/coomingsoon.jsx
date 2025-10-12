import { Box, Heading, Grid, Image, Text, VStack, Spinner, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUpcoming = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?status=upcoming&page=${pageNum}`);
      const data = await res.json();
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setAnimes((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcoming(page);
  }, [page]);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const renderAnimeBox = (anime) => {
    const releaseDate = anime.aired?.from
      ? new Date(anime.aired.from).toLocaleDateString()
      : "TBA";

    return (
      <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="200px"
          h="380px"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg", transition: "0.3s" }}
        >
          <Image
            src={anime.images?.jpg?.image_url}
            alt={anime.title}
            w="100%"
            h="250px"
            objectFit="cover"
          />
          <VStack p={2} align="start" spacing={1}>
            <Text fontWeight="bold" noOfLines={2}>{anime.title}</Text>
            <Text fontSize="sm" color="gray.500">Release: {releaseDate}</Text>
            <Text fontSize="sm" color="yellow.600">⭐ {anime.score || "N/A"}</Text>
          </VStack>
        </Box>
      </Link>
    );
  };

  return (
    <Box p={8}>
      <Heading mb={6}>⏳ Coming Soon Anime</Heading>
      <Grid templateColumns="repeat(auto-fill, 200px)" justifyContent="center" gap={6}>
        {animes.map(renderAnimeBox)}
      </Grid>
      {loading && (
        <Flex justify="center" mt={4}>
          <Spinner size="xl" color="teal.400" />
        </Flex>
      )}
    </Box>
  );
}
