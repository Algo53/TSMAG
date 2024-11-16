import { useEffect} from 'react'
import { useAppDispatch } from '../redux/hook'
import { getAllTaskRoute } from '../redux/slices/taskSlice';
import MyList from '../components/MyList';

function MyTask() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTaskRoute());
  }, [])

  return (
    <div className='flex w-full h-full'>
      <MyList type='My' />
    </div>
  )
}

export default MyTask