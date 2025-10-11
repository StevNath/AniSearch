import { Box, Flex, HStack, Link, IconButton, Spacer, Input, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {

  return (
    <Box background={"blue.700"} px={4} color={"white"}>
      <Flex h={16} alignItems="center">
        <Box as={RouterLink} to="/">
        <Image src="/logo.svg" alt="Logo" boxSize="300px" mr={5} objectFit="contain" />
        </Box>
  
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
            <Link as={RouterLink} to="./login" color={"white"}>Login</Link>

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