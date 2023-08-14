import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../commonUtils/commonUtils";


const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 8px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Image = styled("img")({
  width: "100%",
  borderRadius: "10px 10px 0 0",
  objectFit: "cover",
});

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 550;
`;

const Description = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;
const Blog = ({ blogData }) => {
  return (
    <Container>
      <Image src={blogData.image} alt="blog"></Image>
      <Text>{blogData.categories}</Text>
      <Title>{addElipsis(blogData.title, 20)}</Title>
      <Text>{blogData.userName}</Text>
      <Description>{addElipsis(blogData.description, 30)}</Description>
    </Container>
  );
};
export default Blog;
