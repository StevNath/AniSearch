import { Box, Heading, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Box p={8}>
      <Heading>About Page</Heading>
      <Text mt={2}>AniSearch adalah aplikasi web untuk mencari informasi tentang anime.</Text>
      <Text mt={2}>Dibuat dengan React dan Chakra UI.</Text>
      <Text mt={2}>Sumber data dari Jikan API (MyAnimeList).</Text>
      <Text mt={2}>Dibuat Oleh:</Text>
      <Box as="ul" listStyle="disc" pl={4} mt={2}>
        <li>Joshua Natanael</li>
        <li>Muhammad Nurulloh</li>
        <li>Putra Parlindungan</li>
        <li>Steven Nathanael Meliala</li>
      </Box>
    </Box>
  );
}
