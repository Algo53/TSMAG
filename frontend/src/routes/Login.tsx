import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getUserDetailsRoute, loginUserRoute, selectToken, selectUser, selectUserInfo } from "../redux/slices/userInfoSlice";
import { validateEmail, validatePassword } from "../helper/Validation";
import { getAllTaskRoute } from "../redux/slices/taskSlice";

type UserDetails = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const userInfo = useAppSelector(selectUserInfo);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    password: "",
  })
  
  const [isFormValid, setIsFormValid ] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));    
  }

  const handleSubmit = () => {
    dispatch(loginUserRoute(userDetails));
    setUserDetails( () => {
      return {
        email: "",
        password: "",
      }
    })
  }

  useEffect( () => {
    setIsFormValid(validateEmail(userDetails.email) && validatePassword(userDetails.password));
  }, [userDetails])

  useEffect( () => {
    if (user && token){
      dispatch(getUserDetailsRoute());
    }
  }, [user, token])

  useEffect( () => {
    if(userInfo){
      dispatch(getAllTaskRoute());
      navigate(`/${userInfo._id}`)
    }
  }, [userInfo])

  return (
    <div className='flex w-full h-full justify-center items-center md:px-0 sm:px-10 px-5'>
      <div className='flex h-2/3 xl:w-1/2 lg:w-3/4 md:w-10/12 w-full shadow-xl hover:shadow-2xl rounded-3xl'>
        <div className='flex w-1/2 h-full'>
          <img className='w-full h-full rounded-l-3xl' src='/images/loginPage.jpg' alt='' />
        </div>
        <div className='flex w-1/2 h-full shadow-inner rounded-r-3xl'>
          <div className='flex flex-col w-full h-full lg:px-7 md:px-5 sm:px-2 pt-3 items-center gap-8'>
            <div className='flex sm:text-3xl text-2xl font-bold'>Welcome Back</div>
            <div className='flex flex-col w-full gap-3'>
              <div className='flex border-2 border-slate-200 rounded-xl w-full py-2 pl-2 shadow-inner hover:bg-zinc-200 cursor-pointer items-center'><i className="fa-brands fa-google fa-xl pr-2"/>Continue with Google</div>
              <div className='flex border-2 border-slate-200 rounded-xl w-full py-2 pl-2 shadow-inner hover:bg-zinc-200 cursor-pointer items-center'><i className="fa-brands fa-linkedin fa-xl pr-2"/>Continue with Linkdin</div>
            </div>
            <div className='flex w-full gap-2 items-center'>
              <div className='h-[2px] w-1/2 bg-black/30'></div>
              <div>OR</div>
              <div className='h-[2px] w-1/2 bg-black/30'></div>
            </div>
            <div className='flex flex-col w-full gap-3'>
              <input className="w-full bg-zinc-100 rounded-lg border-2 border-slate-200 py-1 px-2 shadow-inner" type="text" name="email" value={userDetails.email} onChange={handleChange} placeholder="Email" />
              <input className="w-full bg-zinc-100 rounded-lg border-2 border-slate-200 py-1 px-2 shadow-inner" type="password" name="password" value={userDetails.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button className={`flex w-full justify-center text-xl ${isFormValid? "hover:text-[19px] hover:shadow-inner hover:bg-zinc-200" : ""} cursor-pointer bg-zinc-300 py-2 rounded-3xl`} onClick={handleSubmit} disabled={!isFormValid}>Login</button>
            <div className="flex md:text-[15px] sm:text-md text-sm">Don't have an account?<Link to='/signup' className="flex text-blue-400 cursor-pointer pl-1">Sign up</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login