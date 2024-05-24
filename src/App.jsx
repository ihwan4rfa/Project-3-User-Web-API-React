import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginRegister from "./pages/LoginRegister"
import Home from "./pages/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
