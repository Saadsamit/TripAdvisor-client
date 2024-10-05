import PostCardLoading from "./PostCardLoading";
import Container from "../../UI/Container";
import CommentLoading from "./CommentLoading";

const PostDetailLoading = () => {
  return (
    <Container className="my-10">
      <div className="grid md:grid-cols-2 gap-5">
        <PostCardLoading />
        <CommentLoading />
      </div>
    </Container>
  );
};

export default PostDetailLoading;
