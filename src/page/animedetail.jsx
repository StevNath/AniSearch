// src/pages/AnimeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Flex, Image, Text, Heading, Button, VStack } from "@chakra-ui/react";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!anime) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Anime not found.</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" p={4}>
      <Box maxW="900px" w="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
        <Flex direction={{ base: "column", md: "row" }} gap={6} align="flex-start">

          {/* Gambar Anime */}
          <Image
            src={anime.images?.jpg?.large_image_url}
            alt={anime.title}
            borderRadius="md"
            boxShadow="md"
            maxW={{ base: "100%", md: "300px" }}
            objectFit="cover"
          />

          {/* Detail Anime */}
          <VStack align="start" spacing={3} flex="1">
            <Heading size="lg">{anime.title}</Heading>
            <Text fontStyle="italic" color="gray.500">{anime.title_japanese}</Text>

            {/* Info badge */}
            <Flex gap={2} wrap="wrap">
              {anime.type && <Box bg="blue.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm">{anime.type}</Box>}
              {anime.status && <Box bg="green.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm">{anime.status}</Box>}
              {anime.rating && <Box bg="purple.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm">{anime.rating}</Box>}

              {/* Genre clickable */}
              {anime.genres?.map((g) => (
                <Link key={g.mal_id} to={`/anime/genre/${g.name}`}>
                  <Box
                    bg="teal.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                  >
                    {g.name}
                  </Box>
                </Link>
              ))}
            </Flex>

            <Text><strong>Episodes:</strong> {anime.episodes || "N/A"}</Text>
            <Text><strong>Score:</strong> {anime.score || "N/A"}</Text>
            <Text>
              <strong>Aired:</strong> {anime.aired?.from?.split("T")[0]} - {anime.aired?.to?.split("T")[0] || "Ongoing"}
            </Text>
            <Text><strong>Studios:</strong> {anime.studios?.map(s => s.name).join(", ")}</Text>

            <Text textAlign="justify">{anime.synopsis}</Text>

            <Link to="/">
              <Button colorScheme="blue" mt={3}>Kembali ke Home</Button>
            </Link>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
}
