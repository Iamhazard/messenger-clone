import SideBar from "@/components/Sidebar/SideBar";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUser";
import ConversationLists from "./_components/ConversationLists";


export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (

        <SideBar>
            <div className="h-full">
                <ConversationLists
                    initialItems={conversations}
                    users={users}
                />
                {children}
            </div>
        </SideBar>
    );
}