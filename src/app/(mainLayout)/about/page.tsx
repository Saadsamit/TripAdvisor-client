import Aboutus from "@/src/components/modules/about/Aboutus";
import Team from "@/src/components/modules/about/Team";
import CommonBanner from "@/src/components/UI/CommonBanner";
import Container from "@/src/components/UI/Container";

const page = () => {
  return (
    <Container>
      <CommonBanner />
      <Aboutus />
      <Team />
    </Container>
  );
};

export default page;
