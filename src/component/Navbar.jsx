import { Box, Flex, HStack, Link, IconButton, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {

  return (
    <Box background={"purple"} px={4}>
      <Flex h={16} alignItems="center">
        <Box fontWeight="bold">MyWebsite</Box>

        <Spacer />

        <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
            <Link as={RouterLink} to="./">Home</Link>
            <Link as={RouterLink} to="./about">About</Link>
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