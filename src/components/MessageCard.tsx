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
import { Share2, X } from "lucide-react"
import { Message } from "@/model/User.model"
import { toast } from "react-toastify"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"

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

    const handleShare = async () => {
        try {
            const imageUrl = `/api/share-image?message=${encodeURIComponent(message.content)}`
            if (navigator.share) {
                await navigator.share({
                    title: "Anonymous Feedback",
                    text: message.content,
                    url: imageUrl
                })
            } else {
                window.open(imageUrl, "_blank")
            }
        } catch (error) {
            toast.error("Failed to share message")
        }
    }

    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{message.content}</CardTitle>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShare}
                        className="hover:cursor-pointer"
                    >
                        <Share2 className="w-5 h-5" />
                    </Button>
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
                <div className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                </div>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    )
}
