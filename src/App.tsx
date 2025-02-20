import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import List from './components/List'
import Home from './components/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RQapi } from './components/RQapi.tsx'
import Detail from './components/Detail.tsx'
import PaginatedQueries from './components/PaginatedQueries.tsx'
import InfiniteQueries from './components/InfiniteQueries.tsx'
import PostRQ from './components/PostRQ.tsx'
const queryClient = new QueryClient()
function App() {
  return (
    <>
      <BrowserRouter>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/list">api</Link></li>
            <li><Link to="/react-query">api with react query</Link></li>
          </ul>
          <QueryClientProvider client= {queryClient}>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/list' element={<List/>}></Route>
                <Route path='/react-query' element={<RQapi/>}></Route>
                <Route path='/react-query/:postId' element={<Detail/>}></Route>
                <Route path='/paginated-fruits' element={<PaginatedQueries/>}></Route>
                <Route path='/infinite-fruits' element={<InfiniteQueries/>}></Route>
                <Route path='/post' element={<PostRQ/>}></Route>
            </Routes>
            {/* Values: top - bottom - left - right */}
            <ReactQueryDevtools initialIsOpen={false} position='bottom' />
          </QueryClientProvider>
          
        </BrowserRouter>
    </>
  )
}

export default App
