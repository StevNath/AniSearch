import { 
  Box, Grid, GridItem, Input, Flex, Image, Text, VStack, HStack, Link, Spinner, Badge 
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { searchAnime, searchManga } from "../API_JIKAN_V4/jikanv4";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

// Fungsi delay sederhana
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fungsi untuk menampilkan preview hasil pencarian
const handlePreviewSearch = async (q) => {
  if (!q.trim()) {
    setResults([]);
    return;
  }

  setLoading(true);

  try {
    await delay(500); 

    // Panggil kedua API secara bersamaan
    const [animeData, mangaData] = await Promise.all([
      searchAnime(q),
      searchManga(q)
    ]);

    // Beri label tipe agar sistem tahu ini Anime atau Manga
    const animeTagged = animeData.slice(0, 3).map(item => ({ ...item, type: 'Anime' }));
    const mangaTagged = mangaData.slice(0, 3).map(item => ({ ...item, type: 'Manga' }));

    // Gabungkan hasilnya
    setResults([...animeTagged, ...mangaTagged]);

  } catch (error) {
    console.error(error);
    setResults([]);
  } finally {
    setLoading(false);
  }
};


  // Tekan Enter untuk pindah ke halaman hasil pencarian penuh
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!query.trim()) return;
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setResults([]);
    }
  };

  return (
    <Box background="blue.700" px={6} py={3} boxShadow="md" color="white" position="relative">
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        {/* Logo */}
        <GridItem>
          <Box as={RouterLink} to="/">
            <Image src="/logo.svg" alt="Logo" objectFit="contain" />
          </Box>
        </GridItem>

        {/* Search Bar */}
        <GridItem position="relative">
          <Input
            textAlign="start"
            width="100%"
            placeholder="Search Anime/Manga..."
            _placeholder={{ color: "whiteAlpha.700" }}
            bg="whiteAlpha.200"
            color="white"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handlePreviewSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />

          {/* Dropdown Preview */}
          {query && (
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
              ) : results.length > 0 ? (
                results.map((item) => (
  <Flex
    // Ganti key agar unik (karena ID anime & manga bisa sama)
    key={`${item.type}-${item.mal_id}`} 
    align="center"
    p={2}
    w="100%"
    _hover={{ bg: "blue.100", cursor: "pointer" }}
    
    // UBAH BAGIAN ONCLICK INI
    onClick={() => {
      // Cek tipenya: jika Manga ke /manga/, jika Anime ke /anime/
      if (item.type === 'Manga') {
        navigate(`/manga/${item.mal_id}`);
      } else {
        navigate(`/anime/${item.mal_id}`);
      }
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
      <Flex align="center">
        {/* TAMBAHAN: Badge untuk pembeda */}
        <Badge colorScheme={item.type === 'Anime' ? 'blue' : 'green'} mr={2} fontSize="xs">
          {item.type}
        </Badge>
        <Text fontWeight="bold" color="black" fontSize="sm" noOfLines={1}>
          {item.title}
        </Text>
      </Flex>
      <Text fontSize="xs" color="gray.600">
        ⭐ {item.score ?? "N/A"}
      </Text>
    </Box>
  </Flex>
))
              ) : (
                <Box w="100%" p={3} textAlign="center" color="gray.500">
                  Anime not found
                </Box>
              )}
            </VStack>
          )}
        </GridItem>

        {/* Menu Navigasi */}
        <GridItem>
          <HStack spacing={6} justify="flex-end">
            <Link as={RouterLink} to="/" color="white">Home</Link>
            <Link as={RouterLink} to="/schedules" color="white">Schedules</Link>
            <Link as={RouterLink} to="/about" color="white">About</Link>
            <Link as={RouterLink} to="/login" color="white">Login</Link>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
