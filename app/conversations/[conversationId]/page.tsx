import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "../_components/Header";
import ConversationBody from "../_components/ConversationBody";
import Form from "../_components/Form";



interface IParams {
    conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);


    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <ConversationBody />
                <Form />
            </div>

        </div>
    )

}

export default ConversationId