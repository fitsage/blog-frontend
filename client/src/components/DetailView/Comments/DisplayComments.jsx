import { Box, Typography, styled } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 15px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;
const DisplayComments = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const deleteCommentHandler = async () => {
    try {
      console.log(comment._id);
      const response = await fetch(
        `http://localhost:8000/api/deleteComment/${comment._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Comment Deletion Failed");
      console.log("Comment Deleted Successfully");
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {account.userName === comment.name && (
          <DeleteIcon onClick={deleteCommentHandler}></DeleteIcon>
        )}
      </Container>
      <Box>
        <Typography>{comment.commentDescription}</Typography>
      </Box>
    </Component>
  );
};
export default DisplayComments;
