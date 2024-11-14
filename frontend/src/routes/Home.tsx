import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleSignUp = () => {
    navigate('/signup');
  }

  return (
    <div className='flex p-5 w-full h-full'>
      <div className='flex lg:w-8/12 md:w-7/12 h-full'>
        <img className='rounded-2xl w-full h-full hover:shadow-2xl shadow-xl' src='/images/homePage.jpg' alt='' />
      </div>
      <div className='flex lg:w-4/12 md:w-5/12 h-full'>
        <div className='flex flex-col pt-20 px-10 justify-around h-full w-full'>
          <div className='flex flex-col gap-3 shadow-inner'>
            <div className='text-5xl font-bold'>Schedule your day & task with us</div>
            <div className='text-lg'>Transform your productivity: streamline tasks, prioritize goals, and stay on track effortlessly. Your path to organized, efficient success starts here!</div>
          </div>
          <div className='flex w-full justify-around text-xl gap-10'>
            <button className="rounded-xl py-2 bg-blue-500 hover:bg-blue-700 hover:shadow-2xl text-white font-bold w-full" onClick={handleLogin}>Login</button>
            <button className="rounded-xl py-2 bg-blue-500 hover:bg-blue-700 hover:shadow-2xl text-white font-bold w-full" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home