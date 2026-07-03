import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Editor from './pages/Editor.jsx';
import ViewCard from './pages/ViewCard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/view/:payload" element={<ViewCard />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
