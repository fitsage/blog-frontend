import { Fragment } from "react";
import Banner from "../banner/banner";
import Categories from "./categories";
import { Grid } from "@mui/material";
import Blogs from "../blogs/blogs";
const Home = () => {
  return (
    <Fragment>
      <Banner></Banner>
      {/*parent grid */}
      <Grid container>
        {/*child Grid,alloting 2 sections according to screen size*/}
        <Grid item lg={2} sm={2} xs={2}>
          <Categories></Categories>
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Blogs></Blogs>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Home;
