import axios from "axios"

class AiService {
    getAIResponse = async (prompt) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/ai-suggestion",
                { prompt },
                {
                    headers: {
                        "Content-Type" : "application/json"
                }}
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

const aiService = new AiService();

export default aiService;