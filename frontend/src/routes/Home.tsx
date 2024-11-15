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
    <div className='flex sm:p-5 xs:p-2 w-full h-full'>
      <div className='sm:flex hidden lg:w-8/12 md:w-7/12 sm:w-1/2 h-full'>
        <img className='rounded-2xl w-full h-full hover:shadow-2xl shadow-xl' src='/images/homePage.jpg' alt='' />
      </div>
      <div className='flex lg:w-4/12 md:w-5/12 sm:w-1/2 px-2 w-full h-full justify-between'>
        <div className='flex flex-col sm:px-10 xs:px-5 pt-2 justify-around h-full w-full'>
          <div className='flex flex-col gap-3'>
            <div className='md:text-4xl sm:text-xl text-4xl  font-bold'>Schedule your day & task with us</div>
            <div className='md:text-lg text-md'>Transform your productivity: streamline tasks, prioritize goals, and stay on track effortlessly. Your path to organized, efficient success starts here!</div>
            <div className=''>Boost your productivity by scheduling tasks and setting priorities with ease. Streamline your day, focus on your goals, and achieve more effortlessly.</div>
          </div>
          <div className='flex w-full justify-around text-xl gap-10 sm:pb-0 xs:pb-5'>
            <button className="rounded-xl py-2 bg-blue-500 hover:bg-blue-700 hover:shadow-2xl text-white font-bold w-full" onClick={handleLogin}>Login</button>
            <button className="rounded-xl py-2 bg-blue-500 hover:bg-blue-700 hover:shadow-2xl text-white font-bold w-full" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home