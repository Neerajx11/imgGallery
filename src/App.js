import ImageGallery from "./components/ImageGallery";
import Home from "./components/Home";
import TreeNode from "./components/TreeNode";
import Navbar from "./components/Navbar";
import ImageCard from "./components/ImageCard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCardMobile from "./components/ImageCardMobile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imagegallery" element={<ImageGallery />} />
        <Route path="/treenode" element={<TreeNode />} />
        <Route
          path="/imagecard"
          element={
            <div className="m-6">
              <ImageCard />
              <ImageCardMobile />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
