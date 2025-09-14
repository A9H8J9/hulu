'use client'

import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../lib/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Password() {
    const { push } = useRouter();
    const { register, handleSubmit } = useForm({
        values: {
            password: ""
        }
    })
    const mutation = useMutation({
        mutationFn: async ({ password }: { password: string }) => {
            const res = await axiosClient.patch('http://192.168.1.151:3001/user/change-password', { password });
            return res.data;
        },
        onError: (error) => {
            console.log('err', error)
        },
        onSuccess: (data) => {
            console.log('Success:', data.data);
            push('/')
        },
    });
    const onSubmit = (data) => {
        mutation.mutate(data);
    };
    return (
        <>
            <VStack>
                <VStack mt={32} bg="#292929" w={400} h="auto" py={4} px={4} rounded="lg">
                    <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                        <Text>رمز عبور جدید خود را تعیین کنید</Text>
                        <Input  {...register("password", { required: true })} color="black" mt={4} type="text" placeholder="رمز عبور جدید" w="full" bg="white" />
                        <Button mt={4} type="submit" colorPalette="pink">تایید</Button>
                    </form>
                </VStack>
            </VStack>
        </>
    )
}