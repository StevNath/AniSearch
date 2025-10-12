import { Box, Heading, Text, Image, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNowSeasonAnime } from "../api-jikan/Jikanjs";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Other"];

export default function Schedules() {
  const [animeByDay, setAnimeByDay] = useState({});

  useEffect(() => {
    async function fetchSchedule() {
      const allAnime = await getNowSeasonAnime();
      const schedule = {};
      days.forEach(day => (schedule[day] = []));

      allAnime.forEach(anime => {
        const airedDate = anime.aired?.from;
        if (airedDate) {
          const date = new Date(airedDate);
          const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
          if (schedule[weekday]) {
            schedule[weekday].push(anime);
          } else {
            schedule["Other"].push(anime);
          }
        } else {
          schedule["Other"].push(anime);
        }
      });

      setAnimeByDay(schedule);
    }

    fetchSchedule();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={4}>Schedules</Heading>
      <Text mb={8}>Ini adalah jadwal rilis anime musim ini setiap hari</Text>

      {days.map(day => (
        <Box key={day} mb={8}>
          <Heading size="md" mb={3}>{day}</Heading>

          {animeByDay[day]?.length > 0 ? (
            <HStack spacing={4} overflowX="auto" py={2} align="start">
              {animeByDay[day].map(anime => (
                <Box
                  key={anime.mal_id}
                  w="150px"        // lebar seragam
                  h="300px"        // tinggi seragam
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
                  flexShrink={0}   // agar tidak mengecil saat scroll
                >
                  <Link to={`/anime/${anime.mal_id}`}>
                    <VStack spacing={2} h="100%">
                      <Image
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        width="100%"
                        height="220px"
                        objectFit="cover"
                      />
                      <Text fontWeight="bold" fontSize="sm" textAlign="center" noOfLines={3}>
                        {anime.title}
                      </Text>
                    </VStack>
                  </Link>
                </Box>
              ))}
            </HStack>
          ) : (
            <Text fontStyle="italic" color="gray.500">
              Tidak ada anime
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
