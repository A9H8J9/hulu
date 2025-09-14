'use client'

import { Avatar, Box, Button, CloseButton, Drawer, HoverCard, HStack, Portal, SimpleGrid, Span, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { CiSearch } from "react-icons/ci";
import { axiosClient } from "../lib/axios";
import { IoExit } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { push } = useRouter();
    const { data, isPending, error } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await axiosClient.get('http://localhost:3001/user/me')
            return data
        },
    })
    const exitUser = () => {
        localStorage.removeItem("token")
        push('/auth/signin')
    }
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const isMobile = useBreakpointValue({ base: true, md: false });
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            {isDesktop && (
                <HStack w="full" h={14} shadow="xl" bg="#191b1c" >
                    <HStack w="full" justifyContent="space-around">
                        <HStack gap={5}>
                            <Text bg="#27F5B0" px={2} py={1} rounded="lg" color="black" fontWeight="bold" ml={2}>hulu</Text>
                            <Link href="/">
                                <Text fontSize="sm">خانه</Text>
                            </Link>
                            <HoverCard.Root size="lg" positioning={{ placement: "bottom-end" }} openDelay={100} closeDelay={100}>
                                <HoverCard.Trigger asChild>
                                    <Link href="/movies/all">
                                        <HStack gap={0}>
                                            <MdKeyboardArrowDown size={20} />
                                            <Text fontSize="sm">فیلم</Text>
                                        </HStack>
                                    </Link>
                                </HoverCard.Trigger>
                                <Portal>
                                    <HoverCard.Positioner>
                                        <HoverCard.Content dir='rtl' maxW={600}>
                                            <HoverCard.Arrow />
                                            <SimpleGrid columns={[2, null, 4]} gap={5}>
                                                <Link href="/categories/movies/action">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>اکشن</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/adventure">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>ماجراجویی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/animation">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>انیمیشن</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/comedy">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>کمدی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/crime">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>جنایی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/family">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>خانوادگی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/horror">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>ترسناک</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/war">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>جنگی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/documentary">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>مستند</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/romance">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>عاشقانه</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/drama">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>درام</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/history">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>تاریخی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/movies/thriller">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text textAlign="start">هیجان انگیز</Text>
                                                    </Box>
                                                </Link>
                                            </SimpleGrid>
                                        </HoverCard.Content>
                                    </HoverCard.Positioner>
                                </Portal>
                            </HoverCard.Root>
                            <HoverCard.Root size="lg" positioning={{ placement: "bottom-end" }} openDelay={100} closeDelay={100}>
                                <HoverCard.Trigger asChild>
                                    <Link href="/categories/series/all">
                                        <HStack gap={0}>
                                            <MdKeyboardArrowDown size={20} />
                                            <Text fontSize="sm">سریال‌</Text>
                                        </HStack>
                                    </Link>
                                </HoverCard.Trigger>
                                <Portal>
                                    <HoverCard.Positioner>
                                        <HoverCard.Content dir='rtl' maxW={600}>
                                            <HoverCard.Arrow />
                                            <SimpleGrid columns={[2, null, 4]} gap={5}>
                                                <Link href="/categories/series/action">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>اکشن</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/adventure">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>ماجراجویی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/animation">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>انیمیشن</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/comedy">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>کمدی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/crime">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>جنایی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/family">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>خانوادگی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/horror">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>ترسناک</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/war">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>جنگی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/documentary">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>مستند</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/romance">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>عاشقانه</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/drama">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>درام</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/history">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text>تاریخی</Text>
                                                    </Box>
                                                </Link>
                                                <Link href="/categories/series/thriller">
                                                    <Box _hover={{ bg: "gray.800" }} transition="all" alignItems="center" w={24} px={2} rounded="lg" py={1}>
                                                        <Text textAlign="start">هیجان انگیز</Text>
                                                    </Box>
                                                </Link>
                                            </SimpleGrid>
                                        </HoverCard.Content>
                                    </HoverCard.Positioner>
                                </Portal>
                            </HoverCard.Root>
                        </HStack>
                        <HStack gap={3}>
                            <Link href="/search">
                                <Button size="sm" bg="#d8eafe" color="black">
                                    جست و جو
                                    <CiSearch />
                                </Button>
                            </Link>
                            <HoverCard.Root size="sm" positioning={{ placement: "bottom" }}>
                                <HoverCard.Trigger asChild>
                                    {
                                        isPending ?
                                            <Spinner size="md" />
                                            :
                                            <Text>
                                                <Avatar.Root>
                                                    <Avatar.Fallback name={data?.data.name} />
                                                    <Avatar.Image />
                                                </Avatar.Root>
                                            </Text>
                                    }
                                </HoverCard.Trigger>
                                <Portal>
                                    <HoverCard.Positioner>
                                        <HoverCard.Content w="300px">
                                            <HoverCard.Arrow />
                                            {
                                                data?.data.Subscription ?
                                                    <Button bg="green.400" fontWeight="bold" px={3} py={2}>
                                                        اشتراک دارید
                                                    </Button>
                                                    :
                                                    <Button bg="red.400" fontWeight="bold" px={3} py={2}>
                                                        اشتراک ندارید
                                                    </Button>
                                            }
                                            <HStack borderBottom="1px solid gray" mt={6}></HStack>
                                            <Link href="/user">
                                                <HStack dir="rtl" w="full" _hover={{ bg: "gray.700" }} transition="all" rounded="lg" h="auto" py={2} px={2} mt={4}>
                                                    <Avatar.Root size="sm">
                                                        <Avatar.Fallback name={data?.data.name} />
                                                        <Avatar.Image />
                                                    </Avatar.Root>
                                                    <Text>{data?.data.phone}</Text>
                                                </HStack>
                                            </Link>
                                            <HStack onClick={exitUser} dir="rtl" w="full" _hover={{ bg: "gray.700" }} transition="all" rounded="lg" h="auto" py={2} px={2} mt={4}>
                                                <IoExit size={23} />
                                                <Text>خروج</Text>
                                            </HStack>
                                        </HoverCard.Content>
                                    </HoverCard.Positioner>
                                </Portal>
                            </HoverCard.Root>
                        </HStack>
                    </HStack>

                </HStack>
            )}
            {isMobile && (
                <HStack w="full" h={16} shadow="xl" bg="#191b1c">
                    <HStack w="full" justifyContent="space-between" px={5}>
                        <HStack>
                            <Drawer.Root>
                                <Drawer.Trigger asChild>
                                    <HiMenuAlt1 size={25} />
                                </Drawer.Trigger>
                                <Portal>
                                    <Drawer.Backdrop />
                                    <Drawer.Positioner>
                                        <Drawer.Content>
                                            <Drawer.Header>
                                                <Drawer.Title>hulu</Drawer.Title>
                                            </Drawer.Header>
                                            <Drawer.Body dir="rtl">
                                             hi
                                            </Drawer.Body>
                                            <Drawer.Footer dir="rtl">
                                                <HStack w="full" h={12} bg="gray.900" px={4} rounded="lg">
                                                    <Avatar.Root>
                                                        <Avatar.Fallback name={data?.data.name} />
                                                        <Avatar.Image />
                                                    </Avatar.Root>
                                                    <Text>پروفایل</Text>
                                                </HStack>
                                            </Drawer.Footer>
                                            <Drawer.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Drawer.CloseTrigger>
                                        </Drawer.Content>
                                    </Drawer.Positioner>
                                </Portal>
                            </Drawer.Root>
                            <Text bg="#27F5B0" px={2} py={1} rounded="lg" color="black" fontWeight="bold" ml={2}>hulu</Text>

                        </HStack>
                        <HStack>
                            <Link href="/search">
                                <Button size="sm" bg="#d8eafe" color="black">
                                    جست و جو
                                    <CiSearch />
                                </Button>
                            </Link>
                            {
                                isPending ?
                                    <Spinner size="md" />
                                    :
                                    <Link href="/user">
                                        <Avatar.Root>
                                            <Avatar.Fallback name={data?.data.name} />
                                            <Avatar.Image />
                                        </Avatar.Root>
                                    </Link>
                            }
                        </HStack>
                    </HStack>
                </HStack>
            )}
            {
                isVisible &&
                <HStack onClick={handleClick} position="fixed" bottom={10} left={10} zIndex={1} bg="#276CF5" w="59px" h="59px" alignItems="center" justifyContent="center" cursor="pointer" rounded="full"><MdOutlineKeyboardArrowUp size={25} /></HStack>
            }
        </>
    )
}