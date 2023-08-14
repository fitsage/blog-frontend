import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Image = styled("img")({
  height: "30vh",
  margin: "auto",
});

const ImageBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled(Box)`
  margin: 50px 100px;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 30px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const intialBlog = {
  title: "",
  description: "",
  image: "https://i.ibb.co/JxYn8h2/blog-Image2.png",
  userName: "",
  categories: "",
  createdDate: new Date(),
};

const UpdateBlog = () => {
  const [blog, setBlog] = useState(intialBlog);
  const navigate = useNavigate();
  const { id } = useParams();
  const url = "https://i.ibb.co/JxYn8h2/blog-Image2.png";

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getBlogById/${id}`
        );
        if (!response.ok) throw new Error("Fetching Failed");
        const currBlogData = await response.json();
        setBlog(currBlogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogData();
  }, []);

  const dataChangeHandler = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const updateBlogHandler = async (event) => {
    try {
      const response = await fetch(`http://localhost:8000/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      if (!response.ok) throw new Error("Updating Failed");
      console.log("Blog Created Sucessfully");
      navigate(`/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ImageBox>
        <Image src={url}></Image>
      </ImageBox>
      <StyledFormControl>
        <InputTextField
          placeholder="Title"
          onChange={dataChangeHandler}
          name="title"
          value={blog.title}
        ></InputTextField>
        <Button variant="contained" onClick={updateBlogHandler}>
          Update
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Start your Blog"
        onChange={dataChangeHandler}
        name="description"
        value={blog.description}
      ></TextArea>
    </Container>
  );
};
export default UpdateBlog;
