import { Box, Flex, HStack, Link, IconButton, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {

  return (
    <Box background={"blue.700"} px={4} color={"white"}>
      <Flex h={16} alignItems="center">
        <Box fontWeight="Semibold" textStyle="4xl" >AnimeSearch</Box>

        <Spacer />

        <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
            <Link as={RouterLink} to="./" color={"white"}>Home</Link>
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