'use client'

import { Box, Button, HStack, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { axiosClient } from "../../lib/axios";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Search() {
    const [movies, setMovies] = useState([]);
    const [show, setShow] = useState(false)
    const { register, handleSubmit } = useForm({
        values: {
            search: "",
        }
    })
    const onSubmit = (data) => {
        axiosClient.post(`https://web.upera.tv/api/v1/ghost/get/search?query=${data.search}`)
            .then(res => {
                setShow(true)
                setMovies(res.data.data.data)
                setShow(false)
            }
            )
            .catch(err => console.error(err));
    };
    return (
        <>
            <HStack w="full" justifyContent="center" px={{ base: 5, md: 0 }}>
                <HStack maxW={{ base: "sm", md: "2xl" }} justifyContent="space-between" rounded="xl" w="full" h={12} mt={10} bg="#292929" px={3}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', display: "flex" }}>
                        <Input {...register("search", { required: true })} type="text" w="full" bg="#292929" outline="none" unstyled color="white" />
                        <Button unstyled type="submit">
                            <CiSearch size={25} />
                        </Button>
                    </form>
                </HStack>
            </HStack>
            {
                !show &&
                <>
                    <SimpleGrid alignItems="center" justifyContent="center" columns={[2, null, 7]} gap={3} px={4} md={{ mt: 4 }} mt={0}>
                        {movies?.map((x, i) => (
                            <Link href={`/${x.type}/${x.id}`} key={i}>
                                <Box className="group" md={{ w: "200px", h: 280, mt: 10 }} mt={6} w={180} h={240}>
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
                                            <Text>{x.genre?.split(",")[0]}</Text>
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
                        ))}
                    </SimpleGrid>
                </>
            }
            {
                movies === null &&
                <>
                    <HStack w="full" justifyContent="center">
                        <Button colorPalette="red" mt={20}>موردی پیدا نشد...</Button>
                    </HStack>
                </>
            }
        </>
    )
}