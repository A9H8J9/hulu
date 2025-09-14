'use client'

import { Badge, Box, Button, HoverCard, HStack, Image, Portal, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { axiosClient } from "../../../../lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ParamValue } from "next/dist/server/request/params";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import axios from "axios";

export default function AboutMovie() {
    const { type, id } = useParams()
    const [bookmark, setBookmark] = useState(false)
    const realType = type === "movies" ? "movie" : type;
    const [movies, setMovies] = useState<any>();
    const [casts, setCasts] = useState<any>();
    const [similar, setSimilar] = useState<any>();


    axios.get(`https://seeko.film/api/v1/ghost/get/${realType}/${id}`)
        .then(res => {
            setMovies(res.data.data.movie || res.data.data.series)
        }
        )
        .catch(err => console.error(err));
    axios.get(`https://web.upera.tv/api/v1/get/cast/movie/${id}`)
        .then(res => {
            setCasts(res.data.data)
        }
        )
        .catch(err => console.error(err));
    axios.get(`https://web.upera.tv/api/v1/ghost/get/similar/movie/${id}`)
        .then(res => {
            setSimilar(res.data.data.similar)
        }
        )
        .catch(err => console.error(err));
    const mutation = useMutation({
        mutationFn: async ({ type, id }: { type: ParamValue, id: ParamValue }) => {
            const res = await axiosClient.post('http://localhost:3001/bookmark/check', { type, id });
            setBookmark(res.data)
            return res.data;
        },
        onError: (error) => {
        },
        onSuccess: (data) => {
            console.log('Success:', data.data);
        },
    });
    useEffect(() => {
        mutation.mutate({ type: realType, id: id })
    }, [id])
    const mutationBookmark = useMutation({
        mutationFn: async ({ type, id }: { type: ParamValue, id: ParamValue }) => {
            const res = await axiosClient.post('http://localhost:3001/bookmark', { type, id });
            setBookmark(res.data)
            return res.data;
        },
        onError: (error) => {
        },
        onSuccess: (data) => {
            console.log('Success:', data.data);
            setBookmark(true)
        },
    });
    const mutationDeleteBookmark = useMutation({
        mutationFn: async ({ type, id }: { type: ParamValue, id: ParamValue }) => {
            const res = await axiosClient.post('http://localhost:3001/bookmark/delete', { type, id });
            setBookmark(res.data)
            return res.data;
        },
        onError: (error) => {
            console.log('err', error.message)
        },
        onSuccess: (data) => {
            console.log('Success:', data.data);
            setBookmark(false)
        },
    });
    const addBookmark = () => {
        mutationBookmark.mutate({ type: realType, id: id })
    }
    const deleteBookmark = () => {
        mutationDeleteBookmark.mutate({ type: realType, id: id })
    }
    return (
        <>
            <Box w="full" h={500}>
                <HStack position="absolute" bg="blackAlpha.700" w="full" h={500} px={20}>
                    <Image rounded="xl" src={`https://thumb.upera.shop/thumb?w=207&h=307&q=100&fmt=webp&src=https://thumb.upera.shop/s3/posters/${movies?.poster}`} />
                    <VStack w="full" alignItems="start" px={4} mt={230} justifyContent="start" h="full">
                        <HStack>
                            <Text fontSize="2xl">{movies?.name_fa}</Text>
                            {
                                bookmark ?
                                    <HoverCard.Root size="xs" openDelay={100} closeDelay={100}>
                                        <HoverCard.Trigger asChild mr={2}>
                                            <MdBookmarkAdded onClick={() => deleteBookmark} size={30} fill="#F0EC71" />
                                        </HoverCard.Trigger>
                                        <Portal>
                                            <HoverCard.Positioner>
                                                <HoverCard.Content colorPalette="red">
                                                    <HoverCard.Arrow />
                                                    <Text>حذف از نشان شده ها</Text>
                                                </HoverCard.Content>
                                            </HoverCard.Positioner>
                                        </Portal>
                                    </HoverCard.Root>
                                    :
                                    <HoverCard.Root size="xs" openDelay={100} closeDelay={100}>
                                        <HoverCard.Trigger asChild mr={2}>
                                            <MdBookmarkAdd onClick={() => addBookmark} size={30} />
                                        </HoverCard.Trigger>
                                        <Portal>
                                            <HoverCard.Positioner>
                                                <HoverCard.Content>
                                                    <HoverCard.Arrow />
                                                    <Text>افزودن به نشان شده ها</Text>
                                                </HoverCard.Content>
                                            </HoverCard.Positioner>
                                        </Portal>
                                    </HoverCard.Root>
                            }
                        </HStack>
                        <Text fontSize="sm" color="gray.400">{movies?.name}</Text>
                        <HStack mt={5} gap={4} color="gray.300">
                            <Text>{movies?.runtime} دقیقه</Text>
                            <Text>|</Text>
                            <Text color="yellow.400">{movies?.rate}</Text>
                            <Text>|</Text>
                            <Text>سال {movies?.year}</Text>
                            <Text>|</Text>
                            <HStack>
                                <Text>گروه سنی</Text>
                                <Badge colorPalette="purple">{movies?.age}</Badge>
                            </HStack>
                        </HStack>
                        <VStack alignItems="start" mt={3}>
                            <HStack gap={5}>
                                <Text>کارگردان:</Text>
                                <Text>{casts?.directors.map((x) => x.name_fa)}</Text>
                            </HStack>
                            <HStack gap={5}>
                                <Text>تهیه کننده:</Text>
                                <Text>{casts?.producers.map((x) => x.name_fa)}</Text>
                            </HStack>
                        </VStack>
                        <HStack gap={2} mt={3}>
                            {movies?.genre_fa.split(",").map((g, idx) => (
                                <Badge key={idx} bg="yellow.400" color="black">
                                    {g}
                                </Badge>
                            ))}
                        </HStack>
                        <HStack w="full" mt={20} justifyContent="space-between">
                            <HStack>

                            </HStack>
                            <Button >تماشا کنید</Button>
                        </HStack>
                    </VStack>
                </HStack>
                <Image w="full" h="full" src={`https://thumb.upera.shop/thumb?w=764&h=400&q=90&src=https://thumb.upera.shop/s3/backdrops/${movies?.backdrop}`} />
            </Box>
            {/* <VStack px={12} alignItems="start" py={8}>
                <Text fontWeight="bold" fontSize="xl">داستان فیلم</Text>
                <Text color="gray.500">{movies?.overview_fa}</Text>
                <Text fontWeight="bold" fontSize="xl" mt={10}>ستارگان</Text>
                <HStack gap={5}>
                    {
                        casts?.casts?.slice(0, 5).map((x) => {
                            return (
                                <VStack gap={0}>
                                    <HoverCard.Root size="sm" openDelay={100} closeDelay={100}>
                                        <HoverCard.Trigger asChild dir="rtl">
                                            <HStack bg="gray.900" _hover={{ bg: "gray.800" }} transition="all" rounded="xl" px={2} w="200px" h={16}>
                                                <Image w={12} h={12} rounded="full" src={`https://thumb.upera.shop/thumb?w=140&h=140&q=100&a=t&src=https://cdn.upera.shop/s3/casts/${x.image}`} />
                                                <Text fontSize="sm" truncate>{x.name_fa}</Text>
                                            </HStack>
                                        </HoverCard.Trigger>
                                        <Portal>
                                            <HoverCard.Positioner>
                                                <HoverCard.Content w="auto" h={5} justifyContent="center">
                                                    <HoverCard.Arrow />
                                                    {x.name}
                                                </HoverCard.Content>
                                            </HoverCard.Positioner>
                                        </Portal>
                                    </HoverCard.Root>
                                </VStack>
                            )
                        })
                    }

                </HStack>

            </VStack> */}
            {/* <HStack mr={5}>
            <Text fontWeight="bold" fontSize="xl" mt={10}>مشابه</Text>
            <Text fontWeight="bold" fontSize="xl" mt={10}>{movies?.name_fa}</Text>
            </HStack>
            <SimpleGrid columns={[2, null, 7]} gap={3} px={4} md={{ mt: 4 }} mt={0}>
                {similar?.slice(0, 7).map((x, i) => (
                    <Link href={`/${x.type}/${x.id}`} key={i}>
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
                                    <Text>asd</Text>
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
            </SimpleGrid> */}
        </>
    )
}


