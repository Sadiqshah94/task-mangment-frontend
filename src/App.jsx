import { Route, Routes } from "react-router-dom"
import { routes } from "./router"

const App = () => {
  return (
    <Routes>
      {routes.map((item) => <Route key={item.path} element={item.element} path={item.path} />)}
    </Routes>
  )
}

export default App
