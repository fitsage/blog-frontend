import { Fragment } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { useParams } from "react-router-dom";
import CircularJSON from "circular-json";
import DisplayComments from "./DisplayComments";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const initialCommentData = {
  name: "",
  postId: "",
  commentDescription: "",
  date: new Date(),
};

export const Comments = ({ blogData }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [commentData, setCommentData] = useState(initialCommentData);
  const [allCommentsData, setAllCommentsData] = useState([]);
  const { account } = useContext(DataContext);
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getAllComments/${id}`
        );
        const allComments = await response.json();
        setAllCommentsData(allComments);
      } catch (error) {
        console.log("fetching comments Failed");
      }
    };
    fetchAllComments();
  }, [blogData, toggle]);

  const commentChangeHandler = (event) => {
    setCommentData({
      ...commentData,
      name: account.userName,
      postId: id,
      commentDescription: event.target.value,
    });
  };

  const addCommentHandler = async (event) => {
    try {
      const serializedCommentData = CircularJSON.stringify(commentData);
      let response = await fetch("http://localhost:8000/api/comment/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: serializedCommentData,
      });

      if (!response.ok) throw new Error("Fetching failed");

      setCommentData(initialCommentData);
      console.log("Comment Saved Successfully");
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp"></Image>
        <StyledTextArea
          minRows={5}
          placeholder="What's you think of blog"
          value={commentData.commentDescription}
          onChange={commentChangeHandler}
        ></StyledTextArea>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={addCommentHandler}
        >
          Post
        </Button>
      </Container>
      <Box>
        {allCommentsData &&
          allCommentsData.length > 0 &&
          allCommentsData
            .slice()
            .reverse()
            .map((comment) => {
              return (
                <DisplayComments
                  comment={comment}
                  setToggle={setToggle}
                ></DisplayComments>
              );
            })}
      </Box>
    </Box>
  );
};
export default Comments;
