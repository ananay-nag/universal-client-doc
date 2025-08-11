// router.ts
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  )
}