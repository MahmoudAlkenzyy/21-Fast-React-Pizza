import CreateUser from './../features/user/CreateUser';

function Home() {
  return (
    <div className="px-3 py-8 text-center sm:py-10">
      <h1 className=" py-4 text-xl font-bold  md:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
