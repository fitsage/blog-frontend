import { AppBar, Toolbar, Typography, styled } from "@mui/material";
/*Link acts like a router
 */
import { Link } from "react-router-dom";

const Component = styled(AppBar)``;
const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    text-decoration: none;
    color : white
  }
`;
const Header = () => {
  return (
    <Component>
      <Container>
        {/*To describes the url */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">logout</Link>
      </Container>
    </Component>
  );
};

export default Header;
