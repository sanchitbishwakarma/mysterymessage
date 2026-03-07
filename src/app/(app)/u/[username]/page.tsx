'use client';

import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { useParams } from 'next/navigation';
import z from 'zod';
import { acceptingMessagesSchema } from "@/schemas/messsageSchema"
import { useState } from 'react';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'react-toastify';
import { } from "ai"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const specialChar = '||';

const initialMessageString =
    "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const UserMessage = () => {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof acceptingMessagesSchema>>({
        resolver: zodResolver(acceptingMessagesSchema),
    });

    const messageContent = form.watch('content');

    const onSubmit = async (data: z.infer<typeof acceptingMessagesSchema>) => {
        setIsLoading(true)

        try {
            const response = await axios.post<ApiResponse>('/api/send-message', {
                ...data,
                username
            })

            toast.success(response.data.message)
            form.reset({ ...form.getValues(), content: '' })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError.response?.data.message ?? 'Failed to send message')
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="container mx-auto my-8 p-6 rounded max-w-4xl flex-grow flex flex-col  justify-center px-4 md:px-24 py-12">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Public Profile Link
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your anonymous message here"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="flex justify-center">
                        {isLoading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isLoading || !messageContent}>
                                Send It
                            </Button>
                        )}
                    </div>
                </form>
            </Form>

            <Separator className="my-6" />
            <div className="text-center">
                <div className="mb-4">Get Your Message Board</div>
                <Link href={'/sign-up'}>
                    <Button>Create Your Account</Button>
                </Link>
            </div>
        </div>
    )
}

export default UserMessage