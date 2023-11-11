import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { queryClient } from './config/query'
import { router } from './routes'
import { Modal } from './store/modal'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Modal />
      <ToastContainer autoClose={2500} />
    </>
  )
}

export default App
