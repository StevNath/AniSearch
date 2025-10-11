import { Box, Flex, HStack, Link, IconButton, Spacer, Input, Image, Grid, GridItem } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {

  return (
    <Box background={"blue.700"} px={6} py={3} boxShadow="md" color={"white"}>
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        <GridItem>
        <Box as={RouterLink} to="/">
        <Image src="/logo.svg" alt="Logo" objectFit="contain" />
        </Box>
        </GridItem>


        <GridItem>
        <Box>
            <Input textAlign="start"       
            width="100%"
            placeholder="Search Anime or Manga"
            _placeholder={{ color: "whiteAlpha.700" }}
            bg="whiteAlpha.100"
            color="white"
            />
          </Box>
        </GridItem>
        <GridItem>
        <HStack spacing={6}  justifyContent="flex-end">
            <Link as={RouterLink} to="./schedules" color={"white"}>Schedules</Link>
            <Link as={RouterLink} to="./about" color={"white"}>About</Link>
            <Link as={RouterLink} to="./login" color={"white"}>Login</Link>
        </HStack>

        <IconButton
          size="md"
          aria-label="Open Menu"
          display={{ md: "none" }}
        />
        </GridItem>
      </Grid>
    </Box>
  );
}