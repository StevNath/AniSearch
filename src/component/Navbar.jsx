import { Box, Flex, HStack, Link, IconButton, Spacer, Input } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {

  return (
    <Box background={"blue.700"} px={4} color={"white"}>
      <Flex h={16} alignItems="center">
        <Box as={RouterLink} to="/" fontWeight="Semibold" textStyle="4xl" >AnimeSearch</Box>
        <Spacer />
        <Box w="500px"  ml="-400px">
            <Input textAlign="start"       
            width="100%"
            placeholder="Search Anime or Manga"
            _placeholder={{ color: "whiteAlpha.700" }}
            bg="whiteAlpha.100"
            color="white"
            borderRadius="md"
            px={3}>
            </Input>
          </Box>
        <Spacer />
        <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
            <Link as={RouterLink} to="./" color={"white"}>Home</Link>
            <Link as={RouterLink} to="./schedules" color={"white"}>Schedules</Link>
            <Link as={RouterLink} to="./about" color={"white"}>About</Link>

        </HStack>

        <IconButton
          size="md"
          aria-label="Open Menu"
          display={{ md: "none" }}
        />
      </Flex>
    </Box>
  );
}