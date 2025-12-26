import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Grid, Image, Badge, Spinner, Center, VStack } from "@chakra-ui/react";

export default function Schedules() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState({});
  const [loading, setLoading] = useState(true);

  // Daftar hari untuk mapping
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/schedules");
        const result = await response.json();
        
        if (!result.data) {
            throw new Error("Data not found in response");
        }

        // Mengelompokkan data berdasarkan hari
        const grouped = result.data.reduce((acc, anime) => {
          let day = anime.broadcast?.day?.toLowerCase() || "other";
          // Normalisasi hari (misal: "Mondays" -> "monday")
          if (day.endsWith('s')) {
            day = day.slice(0, -1);
          }
          
          if (!acc[day]) acc[day] = [];
          acc[day].push(anime);
          return acc;
        }, {});

        setSchedules(grouped);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) return <Center h="100vh"><Spinner size="xl" /></Center>;

  return (
    <Box p={8}>
      <Heading mb={2}>Schedules</Heading>
      <Text mb={6}>Ini adalah jadwal anime season ini berdasarkan hari tayang.</Text>
   
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {days.map((day, index) => (
          <Box 
            key={day} 
            p={5} 
            shadow="lg" 
            borderWidth="1px" 
            borderRadius="lg"
            bg="white"
            // Spesifik untuk Box ke-7 (Sunday) agar di tengah jika grid sisa satu
            gridColumn={day === "sunday" ? "2 / span 1" : "auto"}
          >
            <Heading size="md" mb={4} textTransform="capitalize" color="blue.600">
              {day}
            </Heading>
            
            <VStack align="stretch" spacing={3}>
              {schedules[day]?.slice(0, 3).map((anime) => ( // Batasi 3 anime per box biar rapi
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
                  transition="background 0.2s"
                >
                  <Image 
                    src={anime.images.jpg.small_image_url} 
                    borderRadius="md" 
                    boxSize="50px" 
                    objectFit="cover"
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="bold" noOfLines={1}>{anime.title}</Text>
                    <Badge colorScheme="green">{anime.broadcast.time || "N/A"} JST</Badge>
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