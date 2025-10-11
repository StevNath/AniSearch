import { Box, Heading, Text, Grid,Image} from "@chakra-ui/react";
import { getTopAnime } from "../API_JIKAN_V4/jikanv4";
import { getSeasonNowAnime } from "../API_JIKAN_V4/jikanv4";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Home() {
  const [TopAnimes, setTopAnimes ] = useState([]);
  const [SeasonNowAnimes, setSeasonAnimes ] = useState([]);

  useEffect(() => {
    // Ambil data Anime
    async function fetchAnime() {
      const TopanimeData = await getTopAnime();
      const seasonNowData = await getSeasonNowAnime();
      setTopAnimes(TopanimeData);
      setSeasonAnimes(seasonNowData);
    }
    fetchAnime();
  }, []);
  



  return (
    <Box>
      <Box background={"blue.300"} p={50} color={"white"}>
        <Heading>  Welcome To AniSearch</Heading>
        <Text textStyle="4xl" fontWeight="bold" mt={1} >Place For Every Anime</Text>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        <Box p={5} shadow="md" borderWidth="1px" m={5} borderRadius="md">
          <Heading fontSize="xl" mb={4}>Search Anime</Heading>
          <Text>Find detailed information about your favorite anime series and movies.</Text>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" m={5} borderRadius="md">
          <Heading fontSize="xl" mb={4}>Search Manga</Heading>
          <Text>Find detailed information about your favorite Manga!</Text>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px" m={5} borderRadius="md">
          <Heading fontSize="xl" mb={4}>Schedules</Heading>
          <Text>Never Miss a New Episode — See When Your Favorite Anime Airs!</Text>
        </Box>
      </Grid>
      
      {/* Section Top Anime */ }
      <Heading fontSize="2xl" mb={4} ml={2}>Top Anime</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {TopAnimes.slice(0, 6).map((anime) => (
          <Box>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md">
              <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
              <Box p={5}>
                <Link to={`/anime/${anime.mal_id}`} >{anime.title}</Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Section Anime Season Sekarang */ }
      <Heading fontSize="2xl" mb={4} ml={2}>Anime Season Now</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {SeasonNowAnimes.slice(0, 6).map((anime) => (
          <Box>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md">
              <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
              <Box p={5}>
                <Link to={`/anime/${anime.mal_id}`} >{anime.title}</Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

    </Box>
  );
}
