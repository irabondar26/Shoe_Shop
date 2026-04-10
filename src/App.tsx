import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AppRoutes from './AppRouter'

function App() {

  return (
    <div className='relative pt-35 lg:pt-43'>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
