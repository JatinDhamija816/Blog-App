import Categories from "./Categories";
import Navbar from "./Navbar";
import ShowBlogs from "./ShowBlogs";
import UsersList from "./UsersList";

const Home = () => {
  // const { setUser, setIndividualBlog } = useAppContext();

  // useEffect(() => {
  //   setIndividualBlog(undefined);
  //   const fetchProfileData = async () => {
  //     try {
  //       const res = await homePage();
  //       if (res.success) {
  //         setUser(res.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile data:", error);
  //     }
  //   };
  //   fetchProfileData();
  // }, []);

  return (
    <div className=" min-h-screen  max-w-full">
      <Navbar />
      <div className="md:flex md:space-x-5 px-1 md:px-10 py-5">
        <div className="md:w-1/4 w-full rounded-lg md:p-5 p-2 mb-5 md:mb-0 h-fit border">
          <Categories />
        </div>

        <div className="md:w-2/4">
          <ShowBlogs />
        </div>

        <div className="hidden md:flex rounded-lg p-5  h-fit border">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default Home;
