import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@mui/material";

import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

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

const CreatePost = () => {
  const [blog, setBlog] = useState(intialBlog);
  const [file, setFile] = useState("");

  const { account } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const url = "https://i.ibb.co/JxYn8h2/blog-Image2.png";

  const dataChangeHandler = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const saveBlogHandler = (event) => {
    blog.categories = location.search?.split("=")[1] || "All";
    blog.userName = account.userName;
    const newBlogData = {
      blogData: blog,
      accessToken: sessionStorage.getItem("accessToken"),
    };
    fetch("http://localhost:8000/api/save/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlogData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Blog created Successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
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
        ></InputTextField>
        <Button variant="contained" onClick={saveBlogHandler}>
          Publish
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Start your Blog"
        onChange={dataChangeHandler}
        name="description"
      ></TextArea>
    </Container>
  );
};
export default CreatePost;
