import CreateUser from './../features/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';

function Home() {

const userName = useSelector(state=>state.user.userName)
  return (
    <div className="px-3 py-8 text-center sm:py-10">
      <h1 className=" py-4 text-xl font-bold  md:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
     {userName===''? <CreateUser />:<Button to="/menu" type='primary'>Contin ordaring</Button>}
    </div>
  );
}

export default Home;
