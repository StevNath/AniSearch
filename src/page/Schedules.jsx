import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Grid, Image, Badge, Spinner, Center, VStack } from "@chakra-ui/react";
import { getSeasonNowAnime } from "../API_JIKAN_V4/jikanv4";

// Convert JST -> GMT
function convertJSTtoGMT(timeJST) {
  if (!timeJST) return "N/A";

  const [hour, minute] = timeJST.split(":").map(Number);
  let gmtHour = hour - 9;
  if (gmtHour < 0) gmtHour += 24;

  return `${gmtHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} GMT`;
}

export default function Schedules() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(true);

  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const result = await getSeasonNowAnime();

        const grouped = result.reduce((acc, anime) => {
          let day = anime.broadcast?.day?.toLowerCase() || "other";
          if (day.endsWith("s")) day = day.slice(0, -1);

          if (!acc[day]) acc[day] = [];
          acc[day].push(anime);
          return acc;
        }, {});

        setSchedules(grouped);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box p={8}>
      <Heading mb={2}>Schedules</Heading>
      <Text mb={6}>Ini adalah jadwal anime season ini berdasarkan hari tayang.</Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {days.map((day) => (
          <Box
            key={day}
            p={5}
            shadow="lg"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            gridColumn={day === "sunday" ? "2 / span 1" : "auto"}
          >
            <Heading size="md" mb={4} textTransform="capitalize" color="blue.600">
              {day}
            </Heading>

            <VStack align="stretch" spacing={3}>
              {schedules[day]?.slice(0, 3).map((anime) => (
                <Box
                  key={anime.mal_id}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  p={2}
                  borderRadius="md"
                >
                  <Image
                    src={anime.images.jpg.small_image_url}
                    borderRadius="md"
                    boxSize="50px"
                    objectFit="cover"
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
                      {anime.title}
                    </Text>

                    <Badge colorScheme="green">
                      {anime.broadcast?.time
                        ? convertJSTtoGMT(anime.broadcast.time)
                        : "N/A"}
                    </Badge>
                  </Box>
                </Box>
              )) || <Text color="gray.500">No schedule found</Text>}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
