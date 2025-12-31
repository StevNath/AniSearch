import { Box, Heading, Text, Grid,Image,} from "@chakra-ui/react";
import { getTopAnime } from "../API_JIKAN_V4/jikanv4";
import { getSeasonNowAnime } from "../API_JIKAN_V4/jikanv4";
import { getAnimeSchedules } from "../API_JIKAN_V4/jikanv4";
import { getTopManga } from "../API_JIKAN_V4/jikanv4";
import { getPublishingManga } from "../API_JIKAN_V4/jikanv4";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Home() {
  const [TopAnimes, setTopAnimes ] = useState([]);
  const [SeasonNowAnimes, setSeasonAnimes ] = useState([]);
  const [SchedulesAnimes, setSchedulesAnimes] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [publishingManga, setPublishingManga] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      // 1. Ambil Top Anime
      try {
        const TopanimeData = await getTopAnime();
        setTopAnimes(TopanimeData);
      } catch (err) {
        console.error("Error fetching top anime:", err);
      }

      // Jeda 1 detik agar API tidak memblokir
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Ambil Top Manga
      try {
        const mangaData = await getTopManga();
        setTopManga(mangaData);
      } catch (err) {
        console.error("Error fetching top manga:", err);
      }

      // Jeda 1 detik
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Ambil Anime Season Now
      try {
        const seasonNowData = await getSeasonNowAnime();
        setSeasonAnimes(seasonNowData);
      } catch (err) {
        console.error("Error fetching season now anime:", err);
      }

      // Jeda 1 detik
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 4. Ambil Manga Publishing 
      try {
        const publishingData = await getPublishingManga();
        setPublishingManga(publishingData);
      } catch (err) {
        console.error("Error fetching publishing manga:", err);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      // 5. Ambil Schedules
      try {
        const schedulesData = await getAnimeSchedules();
        setSchedulesAnimes(schedulesData);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    }

    fetchAllData();
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
        <Link to="/schedules">
          <Box p={5} shadow="md" borderWidth="1px" m={5} borderRadius="md" _hover={{ shadow: "lg", bg: "gray.50" }} transition="all 0.2s">
            <Heading fontSize="xl" mb={4}>Schedules</Heading>
            <Text>Never Miss a New Episode — See When Your Favorite Anime Airs!</Text>
          </Box>
        </Link>
      </Grid>
      
      {/* Section Top Anime */ }
      <Heading fontSize="2xl" mb={4} ml={2}>Top Anime</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {TopAnimes.slice(0, 6).map((anime) => (
          <Box key={anime.mal_id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}>
              <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}} />
              <Box p={5}>
                <Link to={`/anime/${anime.mal_id}`} >{anime.title}
                <Text fontSize="sm" color="gray.500">{anime.season} {anime.year}</Text>
                <Text fontSize="sm" color="gray.500">&#11088;{anime.score}</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Section Anime Season Sekarang */ }
      <Heading fontSize="2xl" mb={4} ml={2}>Anime Season Now</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {SeasonNowAnimes.slice(0, 6).map((anime) => (
          <Box key={anime.mal_id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}>
              <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}/>
              <Box p={5}>
                <Link to={`/anime/${anime.mal_id}`} >{anime.title}
                <Text fontSize="sm" color="gray.500">&#11088;{anime.score || "N/A"}</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Section Top Manga */ }
      <Heading fontSize="2xl" mb={4} ml={2} mt={10}>Top Manga</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {topManga.slice(0, 6).map((manga) => (
          <Box key={manga.mal_id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}>
              <Image src={manga.images.jpg.image_url} alt={manga.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}} />
              <Box p={5}>
                {/* Perhatikan perubahan path link menjadi /manga/ */}
                <Link to={`/manga/${manga.mal_id}`} >{manga.title}
                <Text fontSize="sm" color="gray.500">&#11088;{manga.score || "N/A"}</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Section Manga Publishing Now */}
      <Heading fontSize="2xl" mb={4} ml={2} mt={10}>Manga Publishing Now</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {publishingManga.slice(0, 6).map((manga) => (
          <Box key={manga.mal_id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}>
              <Image src={manga.images.jpg.image_url} alt={manga.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}} />
              <Box p={5}>
                <Link to={`/manga/${manga.mal_id}`} >{manga.title}
                <Text fontSize="sm" color="gray.500">&#11088;{manga.score || "N/A"}</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Section Schedules / Airing Today */ }
      <Heading fontSize="2xl" mb={4} ml={2} mt={10}>Airing Today</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {SchedulesAnimes.slice(0, 6).map((anime) => (
          <Box key={anime.mal_id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={5} boxShadow="md" transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}>
              <Image src={anime.images.jpg.image_url} alt={anime.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} transition="all 0.3s ease" _hover={{ transform: "scale(1.05)",boxShadow:"lg"}}/>
              <Box p={5}>
                <Link to={`/anime/${anime.mal_id}`} >{anime.title}
                <Text fontSize="sm" color="gray.500">{anime.broadcast?.day || "Unknown Day"} {anime.broadcast?.time || ""}</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

    </Box>
  );
}
