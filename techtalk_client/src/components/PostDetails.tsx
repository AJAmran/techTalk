const PostDetails = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>

      <div className="mt-8">
        <h2 className="text-2xl">Comments</h2>
        {comments?.map((comment) => (
          <div key={comment._id} className="border-b p-2">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">
              by {comment.author.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
