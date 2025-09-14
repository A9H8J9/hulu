'use client'
import { Avatar, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../lib/axios";
import { FaBookmark } from "react-icons/fa6";
import { PiPasswordFill } from "react-icons/pi";
import { IoExit } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Profile() {
    const { push } = useRouter();
    const { data, isPending, error } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await axiosClient.get('http://192.168.1.151:3001/user/me')
            return data
        },
    })
    const exitUser = () => {
        localStorage.removeItem("token")
        push('/auth/signin')
    }
    return (
        <HStack>
            <VStack alignItems="center" w="full" px={5} mt={26}>
                <HStack justifyContent="start" w="full">
                    {
                        isPending ?
                            <Spinner size="md" />
                            :
                            <Avatar.Root size="2xl">
                                <Avatar.Fallback name={data?.data.name} />
                                <Avatar.Image />
                            </Avatar.Root>

                    }
                    <VStack alignItems="start">
                        <Text>{data?.data.name}</Text>
                        <Text color="gray.500">{data?.data.phone}</Text>
                    </VStack>
                </HStack>
                {
                    data?.data.Subscription ?
                        <Button bg="green.400" mt={4} w="full" fontWeight="bold" px={3} py={2}>
                            اشتراک دارید
                        </Button>
                        :
                        <Button bg="red.400" mt={4} w="full" fontWeight="bold" px={3} py={2}>
                            اشتراک ندارید
                        </Button>
                }
                <HStack borderBottom="1px solid gray" w="full" mt={4}></HStack>
                <Link href="/user/bookmarks" style={{ justifyContent: "start", width: "100%" }}>
                <HStack mt={3} px={4} rounded="lg" transition="all" justifyContent="start" w="full" h={12} _hover={{ bg: "gray.800" }}>
                    <FaBookmark size={25} />
                    <Text>نشان شده ها</Text>
                </HStack>
                </Link>
                <Link href="/user/password" style={{ justifyContent: "start", width: "100%" }}>
                    <HStack mt={3} px={4} rounded="lg" transition="all" justifyContent="start" w="full" h={12} _hover={{ bg: "gray.800" }}>
                        <PiPasswordFill size={25} />
                        <Text>تغییر کلمه عبور</Text>
                    </HStack>
                </Link>
                <HStack borderBottom="1px solid gray" w="full" mt={2}></HStack>
                <HStack onClick={exitUser} mt={3} px={4} rounded="lg" transition="all" justifyContent="start" w="full" h={12} _hover={{ bg: "gray.800" }}>
                    <IoExit size={25} />
                    <Text>خروج</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}