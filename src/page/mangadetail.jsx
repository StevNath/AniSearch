// src/pages/MangaDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Flex, Image, Text, Heading, Button, VStack } from "@chakra-ui/react";

export default function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
        const data = await res.json();
        setManga(data.data);
      } catch (err) {
        console.error("Error fetching manga:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchManga();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!manga) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Manga not found.</Text>
      </Flex>
    );
  }

  return (
    <Flex justify="center" p={4}>
      <Box maxW="900px" w="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
        <Flex direction={{ base: "column", md: "row" }} gap={6} align="flex-start">
          
          {/* Gambar Manga */}
          <Image
            src={manga.images?.jpg?.large_image_url}
            alt={manga.title}
            borderRadius="md"
            boxShadow="md"
            maxW={{ base: "100%", md: "300px" }}
            objectFit="cover"
          />

          {/* Detail Manga */}
          <VStack align="start" spacing={3} flex="1">
            <Heading size="lg">{manga.title}</Heading>
            <Text fontStyle="italic" color="gray.500">{manga.title_japanese}</Text>

            {/* Info badge */}
            <Flex gap={2} wrap="wrap">
              {manga.type && <Box bg="blue.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm">{manga.type}</Box>}
              {manga.status && <Box bg="green.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm">{manga.status}</Box>}
              
              {/* Genre clickable */}
              {manga.genres?.map((g) => (
                <Link key={g.mal_id} to={`/manga/genre/${g.name}`}>
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

            {/* Detail tambahan */}
            <Text><strong>Chapters:</strong> {manga.chapters || "N/A"}</Text>
            <Text><strong>Volumes:</strong> {manga.volumes || "N/A"}</Text>
            <Text>
              <strong>Published:</strong> {manga.published?.from?.split("T")[0]} - {manga.published?.to?.split("T")[0] || "Ongoing"}
            </Text>
            <Text><strong>Authors:</strong> {manga.authors?.map(a => a.name).join(", ")}</Text>

            {/* Sinopsis */}
            <Text textAlign="justify">{manga.synopsis}</Text>

            {/* Kembali ke Home */}
            <Link to="/">
              <Button colorScheme="blue" mt={3}>Kembali ke Home</Button>
            </Link>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
}
