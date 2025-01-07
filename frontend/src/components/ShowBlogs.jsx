import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../../../utils/AppContext";
import { tempData } from "./tempData";

const ShowBlogs = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState(tempData);
  // const { setIndividualBlog } = useAppContext();
  const [loading, setLoading] = useState(false);
  // chnage loading to true

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await showBlogs();
  //       if (res.success && Array.isArray(res.data)) {
  //         setBlogDetails(res.data);
  //       } else {
  //         setBlogDetails([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blog data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);

  return (
    <div className="container mx-auto px-4 w-full">
      {loading ? (
        <p className="text-2xl mt-5 text-center">Loading...</p>
      ) : blogDetails.length > 0 ? (
        blogDetails.map((blog) => (
          <div
            key={blog.blogId}
            className="shadow-lg hover:shadow-xl hover:shadow-black hover:transition-shadow shadow-black rounded-lg mb-8 px-5 py-5 w-full mx-auto"
          >
            <div>
              <p className="text-xl font-semibold">{blog.title}</p>
              <div className="border-b border-black my-4"></div>
            </div>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: ` ${blog.content.slice(0, 300)}...`,
                }}
                className="break-words max-w-full overflow-hidden"
              ></p>

              <p
                className="text-blue-500 text-right mt-2 hover:underline cursor-pointer"
                // onClick={() => {
                //   console.log(blog);
                //   setIndividualBlog(blog);
                //   navigate("/readBlog");
                // }}
              >
                read more
              </p>
            </div>

            <div className="flex items-center my-5">
              <img
                src={blog.user?.avatar || "/assets/default_User.jpg"}
                className="w-7 rounded-full h-7 mr-2"
              />
              <p>{blog.user.name}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-5 text-2xl text-center">
          Sorry, there are no blogs yet. Be the first to start writing!
        </p>
      )}
    </div>
  );
};

export default ShowBlogs;
