import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginRegister from "./pages/LoginRegister"
import Home from "./pages/Home"

function App() {

  return (
    <div className="w-full h-screen bg-gradient-to-r from-slate-200 to-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRegister />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
