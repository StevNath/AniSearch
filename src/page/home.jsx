import { Box, Heading, Text, Grid } from "@chakra-ui/react";

export default function About() {
  return (
    <Box>
      <Box background={"blue.300"} p={50} color={"white"}>
        <Heading>  Welcome To AnimeSearch</Heading>
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

    </Box>
  );
}
