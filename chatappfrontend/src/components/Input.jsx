import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addConversation, updateConversation } from '../redux/promptSlice'
import aiService from '../service/AiService'
import './input.css'

export default function Input() {

  const [prompt, setPrompt] = useState("")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const id = crypto.randomUUID();
    dispatch(addConversation({id, prompt}))

    const dupPrompt = prompt
    setPrompt("")
    const response = await aiService.getAIResponse(dupPrompt)
    if(response) {
      dispatch(updateConversation({id, response}))
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-2/3 bg-gray-500/20 rounded-3xl border border-gray-700 flex items-center px-4 py-2">
        <form onSubmit={handleSubmit} className='flex justify-between items-center w-full'>
          <textarea
            value={prompt}
            id="promptField"
            placeholder="Ask Anything"
            className="text-gray-300 outline-none bg-transparent resize-none overflow-y-scroll custom-scrollbar min-h-[3rem] max-h-[6rem] w-full p-2"
            rows="3"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button type='submit' className="bg-white flex justify-center items-center h-10 w-10 rounded-full ml-2">
            {loading ? (
              <div className="h-6 w-6 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                  fill="#000000"
                ></path>
              </svg>

            )}
          </button>
        </form>
      </div>
    </div>


  )
}
