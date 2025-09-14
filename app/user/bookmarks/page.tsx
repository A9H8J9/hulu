'use client'

import { useState, useEffect } from "react";
import { axiosClient } from "../../../lib/axios";
import { Box, SimpleGrid, VStack, Text, Image, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Bookmarks() {
    const [movies, setMovies] = useState([]);
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        axiosClient.get('http://localhost:3001/bookmark')
            .then(res => setBookmarks(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (bookmarks.length === 0) return;

        Promise.all(
            bookmarks.map((x) =>
                axiosClient.get(`https://seeko.film/api/v1/ghost/get/${x.type}/${x.movie_id}`)
            )
        )
            .then(responses => {
                console.log('res', responses);
                const newData = responses.flatMap((res, i) => {
                    const { type } = bookmarks[i];
                    const item = res.data?.data?.[type];
                    return item ? [item] : [];
                });
                console.log('new', newData);
                setMovies(newData);
            })
            .catch(err => console.error(err));
    }, [bookmarks]);
    return (
        <>
            <SimpleGrid columns={[2, null, 7]} gap={3} px={4} md={{ mt: 4 }} mt={0}>
                {
                    movies.map((x, i) => {
                        const type = bookmarks.find((y) => y.movie_id === x.id)?.type
                        return (
                            <Link href={`/${type}/${x.id}`} key={i}>
                                <Box className="group" md={{ w: "200px", h: 280, mt: 0 }} mt={6} w={180} h={240}>
                                    <VStack
                                        position="absolute"
                                        _groupHover={{ bg: "blackAlpha.700", opacity: 1 }}
                                        opacity={0}
                                        md={{ w: "200px", h: 280 }}
                                        w={180}
                                        h={240}
                                        rounded="xl"
                                    >
                                        <HStack md={{ mt: "210px" }} mt="170px">
                                            <Text>{x.genre_fa?.split(",")[0]}</Text>
                                            <Text>.</Text>
                                            <Text color="yellow.400">{x.rate}</Text>
                                        </HStack>
                                        <Text>{x.year}</Text>
                                    </VStack>
                                    <Image
                                        bg="black"
                                        md={{ w: "200px", h: 280 }}
                                        w={180}
                                        h={240}
                                        rounded="xl"
                                        src={`https://thumb.upera.shop/thumb?w=207&h=307&q=100&fmt=webp&src=https://thumb.upera.shop/s3/posters/${x.poster}`}
                                    />
                                    <Text mt={1} truncate>{x.name_fa}</Text>
                                </Box>
                            </Link>
                        )
                    })
                }
            </SimpleGrid>
        </>
    )
}
