import SideBar from "@/components/Sidebar/SideBar";
import getUsers from "../actions/getUser";
import UserList from "./_components/UserList";

export default async function UsersLayout({
    children
}: { children: React.ReactNode }) {
    const users = await getUsers()
    return (
        <SideBar>
            <div className="h-full">
                <UserList items={users} />
                {children}
            </div>
        </SideBar>
    )
}