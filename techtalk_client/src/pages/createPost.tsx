import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../redux/services/postApi";
import { toast, ToastContainer } from "react-toastify";

type PostFromInpusts = {
  title: string;
  content: string;
};

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFromInpusts>();

  const onSubmit = async (data: PostFromInpusts) => {
    try {
      await createPost(data).unwrap();
      toast.success("Registration successful! Redirecting to login...");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-16">
      <h1 className="text-2xl mb-4 text-center font-bold">Create Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white shadow-md rounde max-w-lg mx-auto"
      >
        <div className="mb-2">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
            className="block w-full p-2 border rounded"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            {...register("content", { required: "Content is required" })}
            className="block w-full p-2 border rounded"
          />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded"
          type="submit"
        >
          Create Post
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
