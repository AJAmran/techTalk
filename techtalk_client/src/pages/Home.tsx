import { Link } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import { useGetPostsQuery } from "../redux/services/postApi";

const Home = () => {
  const { data: posts, isLoading } = useGetPostsQuery(undefined);

  console.log(posts);
  if (isLoading) return <p>Loading Post....</p>;
  return (
    <div className="p-6">
      <h1>Latest Posts</h1>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post._id} className="border p-4">
            <h2 className="text-2xl font-bold">
              <Link to={`/posts/${post._id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-2">
              {post.content.slice(0, 100)}...
            </p>
            <Link
              to={`/posts/${post._id}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
