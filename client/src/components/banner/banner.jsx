import { Box, Typography, styled } from "@mui/material";
const Image = styled(Box)`
  background-image: url("https://i.ibb.co/JxYn8h2/blog-Image2.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 30vh;
`;
const Banner = () => {
  return <Image></Image>;
};
export default Banner;
