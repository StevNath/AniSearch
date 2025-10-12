import { 
  Box, Grid, GridItem, Input, Flex, Image, Text, VStack, HStack, Link, Spinner 
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { searchAnime, searchManga } from "../api-jikan/Jikanjs";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePreviewSearch = async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);

    const [animeResults, mangaResults] = await Promise.all([
      searchAnime(q),
      searchManga(q)
    ]);

    const combined = [
      ...animeResults.map(item => ({ ...item, searchType: "Anime" })),
      ...mangaResults.map(item => ({ ...item, searchType: "Manga" }))
    ];

    setResults(combined.slice(0, 5)); // preview 5 hasil
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!query.trim()) return;
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setResults([]); // tutup dropdown
    }
  };

  return (
    <Box bg="blue.700" color="white" px={6} py={3} boxShadow="md" position="relative">
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        {/* Logo */}
        <GridItem>
          <Box 
            as={RouterLink} 
            to="/" 
            fontWeight="bold" 
            fontSize="xl" 
            _hover={{ textDecoration: "none", color: "white" }}
          >
            AnimeSearch
          </Box>
        </GridItem>

        {/* Input search */}
        <GridItem position="relative">
          <Input
            placeholder="Search Anime & Manga"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handlePreviewSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            bg="whiteAlpha.200"
            _placeholder={{ color: "whiteAlpha.700" }}
            color="white"
          />

          {/* Dropdown preview */}
          {query && results.length > 0 && (
            <VStack
              position="absolute"
              top="100%"
              left={0}
              right={0}
              bg="whiteAlpha.900"
              borderRadius="md"
              mt={1}
              maxH="300px"
              overflowY="auto"
              zIndex={10}
              boxShadow="md"
              spacing={0}
            >
              {loading ? (
                <Flex w="100%" justify="center" p={2}>
                  <Spinner size="sm" color="teal.400" />
                </Flex>
              ) : (
                results.map(item => (
                  <Flex
                    key={`${item.mal_id}-${item.searchType}`}
                    align="center"
                    p={2}
                    w="100%"
                    _hover={{ bg: "blue.100", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/${item.searchType.toLowerCase()}/${item.mal_id}`);
                      setResults([]);
                      setQuery("");
                    }}
                  >
                    <Image 
                      src={item.images?.jpg?.image_url || ""} 
                      alt={item.title} 
                      boxSize="40px" 
                      borderRadius="md" 
                      mr={3} 
                    />
                    <Box>
                      <Text fontWeight="bold" color="black" fontSize="sm">{item.title} </Text>
                      <Text fontSize="xs" color="black">
                        ⭐ {item.score ?? "N/A"} • {item.searchType}
                      </Text>
                    </Box>
                  </Flex>
                ))
              )}
            </VStack>
          )}
        </GridItem>

        {/* Menu navigasi */}
        <GridItem>
          <HStack justify="flex-end" spacing={6}>
            <Link as={RouterLink} to="/Genre" color="white">Genre</Link>
            <Link as={RouterLink} to="/schedules" color="white">Schedules</Link>
            <Link as={RouterLink} to="/about" color="white">About</Link>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
