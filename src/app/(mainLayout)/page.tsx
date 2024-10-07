import Banner from "@/src/components/modules/home/Banner";
import Category from "@/src/components/modules/home/Category";
import HomeInfo from "@/src/components/modules/home/HomeInfo";
import WhatUserCanDo from "@/src/components/modules/home/WhatUserCanDo";
import Container from "@/src/components/UI/Container";

export default function Home() {
  return (
    <div>
      <Container>
        <Banner />
        <Category />
        <HomeInfo />
        <WhatUserCanDo />
      </Container>
    </div>
  );
}
