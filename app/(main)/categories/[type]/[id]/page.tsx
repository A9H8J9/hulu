"use client";
import { useEffect, useState } from "react";
import { axiosClient } from "../../../../../lib/axios";
import {
    SimpleGrid,
    Box,
    Text,
    VStack,
    HStack,
    Image,
    Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MoviesList() {
    const { type, id } = useParams();

    const [movies, setMovies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async (page: number) => {
        try {
            setLoading(true);
            const res = await axiosClient.post(
                `https://seeko.film/api/v1/ghost/get/${type}/sort?trending=2&genre=${id}&free=1&country=0&persian=0&query=&affiliate=1&imdb=&page=${page}`
            );

            const newMovies = res.data.data.movies || res.data.data.series || [];

            if (newMovies.length > 0) {
                setMovies((prev) => [...prev, ...newMovies]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let currentPage = 1;

        const loadSequentially = async () => {
            while (currentPage <= 50) {
                await fetchMovies(currentPage);
                currentPage++;
                setPage(currentPage);
            }
        };

        loadSequentially();
    }, []);

    return (
        <Box>
            <SimpleGrid columns={[2, null, 7]} gap={3} px={4} mt={{ base: 0, md: 0}}>
                {movies.map((x, i) => (
                    <Link href={`/${type}/${x.id}`} key={i}>
                        <Box
                            className="group"
                            w={{ base: 180, md: 200 }}
                            h={{ base: 240, md: 280 }}
                            mt={{ base: 6, md: 10 }}
                        >
                            <VStack
                                position="absolute"
                                _groupHover={{ bg: "blackAlpha.700", opacity: 1 }}
                                opacity={0}
                                w={{ base: 180, md: 200 }}
                                h={{ base: 240, md: 280 }}
                                rounded="xl"
                            >
                                <HStack mt={{ base: "170px", md: "210px" }}>
                                    <Text>{x.genre?.split(",")[0]}</Text>
                                    <Text>.</Text>
                                    <Text color="yellow.400">{x.rate}</Text>
                                </HStack>
                                <Text>{x.year}</Text>
                            </VStack>

                            <Image
                                bg="black"
                                w={{ base: 180, md: 200 }}
                                h={{ base: 240, md: 280 }}
                                rounded="xl"
                                src={`https://thumb.upera.shop/thumb?w=207&h=307&q=100&fmt=webp&src=https://thumb.upera.shop/s3/posters/${x.poster}`}
                                alt={x.name_fa}
                            />

                            <Text mt={1} truncate>
                                {x.name_fa}
                            </Text>
                        </Box>
                    </Link>
                ))}
            </SimpleGrid>

            {loading && (
                <Box textAlign="center" py={4}>
                    <Spinner size="lg" />
                </Box>
            )}
        </Box>
    );
}

// <SimpleGrid alignItems="center" justifyContent="center" columns={[2, null, 7]} gap={3} px={4} md={{ mt: 4 }} mt={0}>
//     {movies?.map((x, i) => (
//         <Link href={`/${type}/${x.id}`} key={i}>
//             <Box className="group" md={{ w: "200px", h: 280, mt: 10 }} mt={6} w={180} h={240}>
//                 <VStack
//                     position="absolute"
//                     _groupHover={{ bg: "blackAlpha.700", opacity: 1 }}
//                     opacity={0}
//                     md={{ w: "200px", h: 280 }}
//                     w={180}
//                     h={240}
//                     rounded="xl"
//                 >
//                     <HStack md={{ mt: "210px" }} mt="170px">
//                         <Text>{x.genre?.split(",")[0]}</Text>
//                         <Text>.</Text>
//                         <Text color="yellow.400">{x.rate}</Text>
//                     </HStack>
//                     <Text>{x.year}</Text>
//                 </VStack>
//                 <Image
//                     bg="black"
//                     md={{ w: "200px", h: 280 }}
//                     w={180}
//                     h={240}
//                     rounded="xl"
//                     src={`https://thumb.upera.shop/thumb?w=207&h=307&q=100&fmt=webp&src=https://thumb.upera.shop/s3/posters/${x.poster}`}
//                 />
//                 <Text mt={1} truncate>{x.name_fa}</Text>
//             </Box>
//         </Link>
//     ))}
// </SimpleGrid>


