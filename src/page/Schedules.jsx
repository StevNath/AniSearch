import { Box, Heading, Text, Grid, Center} from "@chakra-ui/react";

export default function Schedules() {
  return (
    <Box p={8}>
      <Heading>Schedules</Heading>
      <Text mt={4}>Ini adalah jadwal animek season ini</Text>
   
      <Box p={8}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 1</Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 2</Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 3</Box>

            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 4</Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 5</Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">Box 6</Box>

            <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                gridColumn="2 / span 1" // center kolom ke-2
            >
                Box 7
            </Box>    
        </Grid>
      </Box>
    </Box>

  );
}
