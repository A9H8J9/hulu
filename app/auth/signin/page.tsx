'use client'

import { Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Toaster, toaster } from "../../../components/ui/toaster"

export default function SignIn() {
    const { push } = useRouter();
    const { register, handleSubmit } = useForm({
        values: {
            phone: "",
            password: ""
        }
    })
    const mutation = useMutation({
        mutationFn: async ({ phone, password }: { phone: string, password: string }) => {
            const res = await axios.post('http://localhost:3001/auth/signin', { phone, password });
            return res.data;
        },
        onError: (error) => {
            toaster.create({
                type: 'error',
                description: error.response.data.message,
            })
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            push('/')
        },
    });
    const onSubmit = (data) => {
        mutation.mutate({ phone: data.phone, password: data.password });
    };

    return (
        <>
            <Toaster />
            <VStack pt={20}>
                <Heading mb={2}>ثبت نام</Heading>
                <VStack py={4} px={3} bg="white" rounded="lg" alignItems="start" color="black" shadow="xl" w={400} h="auto">
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <Text mt={2}>شماره تلفن</Text>
                        <Input {...register("phone", { required: true })} mt={2} type="tel" />
                        <Text mt={2}>رمز عبور</Text>
                        <Input {...register("password", { required: true })} mt={2} type="password" />
                        <Button type="submit" mt={3}>ثبت نام</Button>
                    </form>
                </VStack>
            </VStack >
        </>
    )
}