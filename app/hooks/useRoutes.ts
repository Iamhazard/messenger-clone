import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import useConversation from "./useConversation";



const useRoutes=()=>{
    const pathname=usePathname()
    const {conversationId}=useConversation();

    const routes=useMemo(()=>[
        {
            label:'Chat',
            herf:'/conversations',
            icon: HiChat,
            active:pathname  ==='/conversations' || !!conversationId

        },
         {
            label:'Users',
            herf:'/users',
            icon: HiUsers,
            active:pathname  ==='/users'

        },
         {
            label:'Logout',
            herf:'#',
            icon: HiArrowLeftOnRectangle,
            onClick:()=>signOut(),

        }
    ],[conversationId, pathname])

    return routes
}
 
export default useRoutes 
