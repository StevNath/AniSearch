import { Box, Heading, Text, Grid,Image,} from "@chakra-ui/react";
import { getSeasonNowAnime } from "../API_JIKAN_V4/jikanv4";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Top() {
  const [SeasonNowAnimes, setSeasonAnimes ] = useState([]);
    useEffect(() => {
        async function fetchSeasonNowAnime() {
            try {
                const seasonNowData = await getSeasonNowAnime();
                setSeasonAnimes(seasonNowData);
            } catch (err) {
                console.error("Error fetching top anime:", err);
            }  
        }
        fetchSeasonNowAnime();
    }, []);

    return (
        <Box p={8}>
            <Heading mb={4}>Season Now Anime</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {SeasonNowAnimes.map((anime) => (
                    <Box key={anime.mal_id} borderWidth="1px" borderRadius="lg" overflow="hidden" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}    >
                        <Link to={`/anime/${anime.mal_id}`}>   
                            <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}} />
                            <Box p={4}>
                                <Text fontWeight="bold" fontSize="md" mb={2} noOfLines={2}>
                                    {anime.title}
                                </Text>
                                <Text fontSize="sm" color="gray.500">Score: {anime.score || "N/A"}</Text>
                            </Box>
                        </Link>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}