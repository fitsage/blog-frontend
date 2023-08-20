import { Box, Typography, styled } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { Snackbar, Alert } from "@mui/material";

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
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const deleteCommentHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/deleteComment/${comment._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Comment Deletion Failed");
      const alert = alertDetails;
      alert.severity = "success";
      alert.message = "Comment Deleted Successfully";
      setAlertDetails(alert);
      setOpenAlert(true);
      setToggle((prevState) => !prevState);
    } catch (error) {
      const alert = alertDetails;
      alert.severity = "error";
      alert.message = "Comment Deletion Failed";
      setAlertDetails(alert);
      setOpenAlert(true);
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
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertDetails.severity}
          onClose={handleClose}
          variant="filled"
          elevation={6}
        >
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </Component>
  );
};
export default DisplayComments;
