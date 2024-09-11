import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Initial from "./routes/Initial"
import Profiles from "./routes/Profiles"
import Contact from "./routes/Contact"
import SingleProfile from "./routes/SingleProfile"
import Updater from "./routes/Updater"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profiles/:profileID" element={<SingleProfile />} />
          <Route path="/profiles/update/:updateID" element={<Updater />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
