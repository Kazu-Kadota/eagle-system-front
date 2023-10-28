import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2500} />
    </>
  )
}

export default App
