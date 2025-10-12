import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text, Spinner, VStack, Heading } from "@chakra-ui/react";
import { searchAnime, searchManga } from "../api-jikan/Jikanjs";

export default function SearchResults() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    async function fetchData() {
      if (!query) return;
      setLoading(true);

      try {
        const [animeResults, mangaResults] = await Promise.all([searchAnime(query), searchManga(query)]);
        const combined = [
          ...animeResults.map(a => ({ ...a, type: "Anime" })),
          ...mangaResults.map(m => ({ ...m, type: "Manga" }))
        ];
        setItems(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);

  const renderBox = (item) => (
    <Box
      key={`${item.mal_id}-${item.type}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      _hover={{ transform: "scale(1.05)", transition: "0.2s", cursor: "pointer", boxShadow: "md" }}
      onClick={() => navigate(`/${item.type.toLowerCase()}/${item.mal_id}`)}
      bg="white"
      display="flex"
      flexDirection="column"
      p={2}
      m={2}
      w="200px"
      h="300px"
      position="relative"
    >
      {/* Rating overlay */}
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
        ⭐ {item.score ?? "N/A"}
      </Box>

      <Box h="160px" w="100%" overflow="hidden" mb={2}>
        <Image
          src={item.images?.jpg?.image_url || ""}
          alt={item.title}
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="md"
        />
      </Box>

      <VStack align="start" spacing={1} flex="1">
        <Text fontWeight="bold" noOfLines={2} fontSize="sm">{item.title}</Text>
        <Text fontSize="xs" color="gray.500">{item.type}</Text>
      </VStack>
    </Box>
  );

  if (loading)
    return (
      <Flex justify="center" align="center" h="60vh">
        <Spinner size="xl" color="teal.400" />
      </Flex>
    );

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Hasil Pencarian: {query}</Heading>

      {items.length === 0 ? (
        <Text>Tidak ada hasil ditemukan.</Text>
      ) : (
        <Flex flexWrap="wrap" justify="center">
          {items.map(renderBox)}
        </Flex>
      )}
    </Box>
  );
}
