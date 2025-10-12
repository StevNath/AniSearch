import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";

export default function About() {
  return (
    <Box p={8}>
      <Heading mb={4}>About This Website</Heading>
      <VStack align="start" spacing={3}>
        <Text>
          Halo! Saya membuat website ini **sendirian** sebagai proyek pribadi untuk menampilkan informasi anime dan manga dari API Jikan.
        </Text>
        <Text>
          Website ini menggunakan <strong>React</strong> dengan <strong>Chakra UI</strong> untuk tampilan, dan memanfaatkan <strong>React Router</strong> untuk navigasi antar halaman.
        </Text>
        <Text>
          Tujuannya adalah untuk mempermudah pencarian anime dan manga, melihat detail tiap judul, serta menjelajahi genre favorit.
        </Text>
        <Text>
          Semua data diambil dari <Link href="https://jikan.moe/" color="teal.500" isExternal>Jikan API</Link>.
        </Text>
        <Text>
          Semoga website ini bermanfaat dan bisa menjadi referensi atau inspirasi bagi yang ingin belajar membuat proyek React sendiri!
        </Text>
      </VStack>
    </Box>
  );
}
