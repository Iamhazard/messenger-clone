'use client'
import React, { useState } from 'react'
import { Conversation, User } from "@prisma/client"
import { FullConversationType } from '@/types';
import { useRouter } from 'next/navigation';
import useConversation from '@/app/hooks/useConversation';
import { cn } from '@/lib/utils';
import { MdOutlineGroup } from "react-icons/md";
import ConversationBox from './ConversationBox';
import GroupChatModal from '@/components/Modal/GroupChatModal';

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[]

}

const ConversationLists: React.FC<ConversationListProps> = ({ initialItems, users }) => {
    const [items, setItems] = useState(initialItems)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()
    const { conversationId, isOpen } = useConversation()
    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside className={cn(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`, isOpen ? 'hidden' : 'block w-full left-0')}>
                <div className='px-5'>
                    <div className='flex justify-between mb-4  pt-4'>
                        <div className='text-2xl font-bold text-neutral-800 '>
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition '>
                            <MdOutlineGroup size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />

                    ))}

                </div>
            </aside>
        </>
    )
}

export default ConversationLists