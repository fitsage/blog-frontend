import { Fragment, useEffect, useState } from "react";
import { Box, Grid, styled } from "@mui/material";
import Blog from "./blog";
import { useSearchParams, Link } from "react-router-dom";

const CustomBox = styled(Box)`
  color: #878787;
  margin: 30px 25%;
  font-size: 25px;
`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const blogCategory = searchParams.get("category");
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const category = { category: blogCategory };
        const response = await fetch("http://localhost:8000/api/getBlogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
        if (!response.ok) throw new Error("Fetching Failed");
        const blogsData = await response.json();
        setBlogs(blogsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBlogs();
  }, [blogCategory]);

  return (
    <Fragment>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link
              to={`details/${blog._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Blog blogData={blog}></Blog>
            </Link>
          </Grid>
        ))
      ) : (
        <CustomBox>No Blogs available, Start Writing Some</CustomBox>
      )}
    </Fragment>
  );
};

export default Blogs;
