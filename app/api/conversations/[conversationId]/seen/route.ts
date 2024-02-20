import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb"
import { pusherServer } from "@/app/lib/pusher";

interface IParams {
    conversationId?: string
}


export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        const {
            conversationId
        } = params;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    },
                },
                users: true,

            }
        })

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }
        const lastMessage = existingConversation.messages[existingConversation.messages.length - 1]

        if (!lastMessage) {
            return NextResponse.json(existingConversation);
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }

        })
         //update all connections

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    });

    // If user has already seen the message, no need to go further
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(existingConversation);
    }
    // Update last message seen
    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);
      
        return NextResponse.json(updatedMessage)

    } catch (error) {
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse('Error', { status: 500 });
    }
}