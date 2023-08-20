import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material"; //Box is nothing but the div in MUI
//TextField is analogus to input in html of MUI
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
/*We are styling the box component using styled components.
Now Component stores the Box with provided Css*/
const Component = styled(Box)`
  width: 400px;
  margin: auto; //aligining to center
  margin-top: 5%;
  box-shadow: 5px 2px 5px 2px rgb(0, 0, 0, 0.6); /*adding shadow to box */
`;

/*As we are styling the html element i.e img the syntax of styling
html elment is differernt
Syntax : 
1.wrap the html that you want to style in quotes.
2.Now write down the css in the object in paranthesis provided later
*/
const Image = styled("img")({
  width: 300,
  height: 150,
  margin: "auto",
  display: "flex",
  paddingTop: 20,
});

const Wrapper = styled(Box)`
  padding: 0px 20px 35px;
  display: flex;
  flex-direction: column;
  & > div //chaning the css of child component from parent component
  {
    margin-top: 10px;
  }
  & > button {
    margin-top: 15px;
  }
`;

/*Button of MUI automatically tranforms the text in Button to Capital,
We are overriding it by removing the transformation,the text will display
as we provided */
const CustomButton = styled(Button)`
  text-transform: none;
  margin: auto;
`;

const SignUpError = styled(Typography)`
  color: red;
`;

const LoginError = styled(Typography)`
  color: red;
`;

const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    // "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    "https://i.ibb.co/JxYn8h2/blog-Image2.png";

  /*useState function to switch b/w login and signup */
  const [account, toggleAccount] = useState("login");
  /*useState for capturing the entered Name,userName and password.
  Intially they are empty strings */
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });
  const { setAccount } = useContext(DataContext);
  /*Intializing Navigation */
  const navigate = useNavigate();
  /*toggle Handler */
  const toggleSignUpHandler = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  /*onChange event handler returns a event,which contains information about the event 
that occurred and provides various properties and methods to interact with that event. 

event.target represents the element on which the event occurred, 
and event.target.value would give you the value of the input field when the value change
*/
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginUserHandler = (event) => {
    const userData = {
      userName: userName,
      password: password,
    };
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Either userName or Password is Wrong");
        }
        return response.json();
      })
      .then((data) => {
        // Extract the data from the parsed JSON response
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const name = data.name;
        const userName = data.userName;

        // Store the tokens and other data in session storage
        sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
        sessionStorage.setItem("refreshToken", `Bearer ${refreshToken}`);
        /*Storing userName and name globally using  contextAPI*/
        setAccount({ userName: userName, name: name });
        isUserAuthenticated(true);
        /*navigating to the home page */
        navigate("/");
      })
      .catch((error) => {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "login Failed";
        setAlertDetails(alert);
        setOpenAlert(true);
      });
  };
  const signUpHandler = (event) => {
    const userData = {
      name: name,
      userName: userName,
      password: password,
    };
    fetch("http://localhost:8000/api/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const alert = alertDetails;
        alert.severity = "success";
        alert.message = "SignUp Sucessful, Please login";
        setAlertDetails(alert);
        setOpenAlert(true);
        toggleAccount("login");
      })
      .catch((error) => {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "Any Field missing or userName Already Taken";
        setAlertDetails(alert);
        setOpenAlert(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="logo"></Image>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter username"
              onChange={userNameChangeHandler}
            ></TextField>
            <TextField
              variant="standard"
              label="Enter password"
              onChange={passwordChangeHandler}
            ></TextField>
            {loginError && (
              <LoginError>
                Any Field Empty or username Doesn't Exists
              </LoginError>
            )}
            <CustomButton variant="contained" onClick={loginUserHandler}>
              Login
            </CustomButton>
            <CustomButton variant="contained" onClick={toggleSignUpHandler}>
              Create a Account
            </CustomButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Name"
              onChange={nameChangeHandler}
            ></TextField>
            <TextField
              variant="standard"
              label="Enter Username"
              onChange={userNameChangeHandler}
            ></TextField>
            <TextField
              variant="standard"
              label="Enter Password"
              onChange={passwordChangeHandler}
            ></TextField>
            <CustomButton variant="contained" onClick={signUpHandler}>
              Sign Up
            </CustomButton>
            <CustomButton variant="contained" onClick={toggleSignUpHandler}>
              Already have an account
            </CustomButton>
          </Wrapper>
        )}
      </Box>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
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

/*Exporting the component */
export default Login;
