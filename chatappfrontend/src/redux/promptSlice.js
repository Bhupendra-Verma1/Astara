import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations : []
}

const promptSlice  = createSlice({
    name : "prompt",
    initialState,
    reducers : {
        addConversation : (state, action) => {
            const conversation = {
                id : action.payload.id,
                prompt : action.payload.prompt,
                response : "",
                status : "loading"
            }
            state.conversations.push(conversation)
        },
        updateConversation : (state, action) => {
            const conversation = state.conversations.find((c) => c.id == action.payload.id)

            if(conversation) {
                conversation.response = action.payload.response
                conversation.status = "success"
            }
        }
    }
})

export const {addConversation, updateConversation} = promptSlice.actions

export default promptSlice.reducer

