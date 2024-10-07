import Container from "@/src/components/UI/Container";
import img from "@/src/assets/failed.png";
import Image from "next/image";
import Button from "@/src/components/UI/Button";

const page = () => {
  return (
    <Container>
      <div className="flex justify-center items-center py-40">
        <div className="text-center">
          <div className="flex justify-center gap-2">
            <Image src={img.src} alt="Failed Image" width={50} height={50} />
            <h5 className="text-xl font-bold">payment failed</h5>
          </div>
          <Button className="mt-5" link="/">Home</Button>
        </div>
      </div>
    </Container>
  );
};

export default page;
