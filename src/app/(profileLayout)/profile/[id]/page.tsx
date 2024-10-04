import Container from "@/src/components/UI/Container";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return <Container className="my-10">{id}</Container>;
};

export default page;
