import { Header, Chat, Input } from "./components/Index"

function App() {


  return (
    <div className="w-full h-screen bg-[#212529] flex flex-col pb-5">
      <Header />
      <Chat />
      <Input />
    </div>
  )

}

export default App
