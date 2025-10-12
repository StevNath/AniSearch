import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Heading, Grid, Image, Text, Button, HStack } from "@chakra-ui/react";
import { searchMangaByGenre } from "../api-jikan/Jikanjs";

export default function SearchMangaGenre() {
  const { genreName } = useParams();
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    async function fetchManga() {
      setLoading(true);
      const result = await searchMangaByGenre(genreName, page);
      setMangaList(result.data);
      setHasNext(result.pagination.has_next_page);
      setLoading(false);
    }
    fetchManga();
  }, [genreName, page]);

  // render box untuk tiap manga
  const renderMangaBox = (manga) => (
    <Link key={manga.mal_id} to={`/manga/${manga.mal_id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        _hover={{ transform: "scale(1.03)", transition: "0.2s" }}
      >
        {/* Rating */}
        <Box
          position="absolute"
          top={2}
          right={2}
          background="blackAlpha.700"
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
          src={manga.images?.jpg?.image_url || ""}
          alt={manga.title}
          width="100%"
          height="300px"
          objectFit="cover"
        />
        <Box p={3}>
          <Text fontWeight="bold" fontSize="md" noOfLines={2}>
            {manga.title}
          </Text>
        </Box>
      </Box>
    </Link>
  );

  return (
    <Box p={8}>
      <Heading mb={4}>Hasil Pencarian Manga Genre: {genreName}</Heading>

      {loading ? (
        <Text>Loading...</Text>
      ) : mangaList.length === 0 ? (
        <Text>Tidak ada manga untuk genre ini.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {mangaList.map(renderMangaBox)}
        </Grid>
      )}

      {/* Pagination */}
      <HStack mt={6} spacing={4}>
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          isDisabled={page === 1 || loading}
        >
          Previous
        </Button>
        <Text>Halaman {page}</Text>
        <Button
          onClick={() => setPage(prev => prev + 1)}
          isDisabled={!hasNext || loading}
        >
          Next
        </Button>
      </HStack>

      <Box mt={6}>
        <Link to="/genre">
          <Button colorScheme="blue">Kembali ke Genre</Button>
        </Link>
      </Box>
    </Box>
  );
}
