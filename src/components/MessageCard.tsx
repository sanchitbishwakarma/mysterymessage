"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Copy, Share2, X } from "lucide-react"
import { Message } from "@/model/User.model"
import { toast } from "react-toastify"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Input } from "./ui/input"

type MessageCardProp = {
    message: Message;
    onMessageDelete: (messageId: string) => void
}

export default function MessageCard({ message, onMessageDelete }: MessageCardProp) {

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.success(response.data.message || "Message deleted successfully")
            onMessageDelete(String(message._id))
        } catch (error) {
            toast.error("Failed to delete message")
        }
    }

    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
    const shareLink = `${baseUrl}/api/share-image?message=${encodeURIComponent(message.content)}`

    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{message.content}</CardTitle>

                    <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:cursor-pointer"
                                >
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="sm:max-w-md">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Share feedback</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Anyone with this link can view this feedback.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <div className="flex items-center gap-2 mt-4">
                                    <Input
                                        value={shareLink}
                                        readOnly
                                        className="flex-1"
                                    />
                                    <Button size="icon" onClick={() => {
                                        navigator.clipboard.writeText(shareLink)
                                        toast.success("Link copied to clipboard")
                                    }}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>

                                <AlertDialogFooter className="mt-4">
                                    <AlertDialogCancel>Close</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon" className="hover:cursor-pointer">
                                    <X className="w-5 h-5" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        message from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteConfirm} className="hover:cursor-pointer bg-red-600 hover:bg-red-800">Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                </div>
                <div className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                </div>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    )
}
