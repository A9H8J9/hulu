import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <Box
            bg="gray.900"
            color="gray.100"
            py={8}
            mt={20}
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
                maxW="1200px"
                mx="auto"
                px={4}
            >
                <Text bg="#27F5B0" px={2} py={1} rounded="lg" color="black" fontWeight="bold" ml={2}>hulu</Text>
                <Stack direction="row" mt={{base: 8, md: 0}} gap={6} mb={{ base: 8, md: 0 }}>
                    <Link href="/">خانه</Link>
                    <Link href="/movies/all">فیلم‌ها</Link>
                    <Link href="/series/all">سریال‌ها</Link>
                </Stack>

                {/* Social Icons */}
                <Stack direction="row" gap={4}>

                    <IconButton aria-label="instagram">
                        <FaInstagram/>
                    </IconButton>
                    <IconButton aria-label="telegram">
                        <FaTelegram />
                    </IconButton>
                    <IconButton aria-label="twitter">
                        <FaTwitter />
                    </IconButton>
                </Stack>
            </Flex>
            <Text textAlign="center" fontSize="sm" mt={6} color="gray.500">
                © {new Date().getFullYear()} hulu - همه حقوق محفوظ است.
            </Text>
        </Box>
    )
}