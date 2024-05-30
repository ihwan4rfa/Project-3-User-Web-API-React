import { useRoutes } from "react-router-dom"
import { routeList } from "./routes/routeList";

function App() {
  const element = useRoutes(routeList)
  return element;
}

export default App

