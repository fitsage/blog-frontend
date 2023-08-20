import { Fragment } from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { DataContext } from "../../context/DataProvider";
import Comments from "./Comments/comments";
import { Snackbar, Alert } from "@mui/material";
const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled(Box)`
  background-image: url("https://i.ibb.co/JxYn8h2/blog-Image2.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 30vh;
`;

const Title = styled(Typography)`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)`
  color: #878787;
  margin-bottom: 10px;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const [blogData, setBlogData] = useState([]);
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getBlogById/${id}`
        );
        if (!response.ok) throw new Error("Fetching Failed");
        const currBlogData = await response.json();
        setBlogData(currBlogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogData();
  }, []);

  const deleteBlogHandler = async (event) => {
    try {
      let response = await fetch(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Deletion Failed");
      const alert = alertDetails;
      alert.severity = "success";
      alert.message = "Blog Deleted Successfully Redirecting to Home Page";
      setAlertDetails(alert);
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      const alert = alertDetails;
      alert.severity = "error";
      alert.message = "Blog Deletion Unsuccessful";
      setAlertDetails(alert);
      setOpenAlert(true);
    }
  };

  return (
    <Fragment>
      <Container>
        <Image></Image>
        <Box style={{ float: "right" }}>
          {account.userName == blogData.userName && (
            <Fragment>
              <Link to={`/update/${blogData._id}`}>
                <EditIcon color="primary"> </EditIcon>
              </Link>
              <DeleteIcon
                onClick={deleteBlogHandler}
                color="error"
              ></DeleteIcon>
            </Fragment>
          )}
        </Box>
        <Title>{blogData.title}</Title>
        <Author>
          <Typography>
            Author :
            <Box
              component="span"
              style={{ fontWeight: 600, paddingLeft: "4px" }}
            >
              {blogData.userName}
            </Box>
          </Typography>
          <Typography>
            Created Date :
            <Box
              component="span"
              style={{ fontWeight: 600, paddingLeft: "4px" }}
            >
              {new Date(blogData.createdDate).toDateString()}
            </Box>
          </Typography>
        </Author>
        <Description>{blogData.description}</Description>
        <Comments blogData={blogData}></Comments>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
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
      </Container>
    </Fragment>
  );
};

export default DetailView;
