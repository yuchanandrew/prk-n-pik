const Home = () => {
  return (
    <div className="flex flex-col justify-items-center space-y-6">
      <h2 className="heading text-center">Welcome to the store!</h2>
      <div className="flex flex-col w-1/2 h-auto justify-center items-center">
        <img
          src="../../public/thumbs_up.jpg"
          alt="thumbs_up"
          className="p-12"
        />
      </div>
    </div>
  );
};

export default Home;
