import NewsFeedNav from "@/src/components/modules/profile/NewsFeedNav";
import Posts from "@/src/components/modules/profile/Posts";
import Profile from "@/src/components/modules/profile/Profile";
import Container from "@/src/components/UI/Container";

const page = () => {
  return (
    <div>
      <NewsFeedNav />
      <Container>
        <Profile />
        <Posts />
      </Container>
    </div>
  );
};

export default page;
