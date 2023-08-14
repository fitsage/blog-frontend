import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Fragment } from "react";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  margin-left: 10px;
`;

const CustomButton = styled(Button)`
  text-transform: none;
  width: 90%;
  margin: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <Fragment>
      <StyledLink to={`/create?category=${category || ""}`}>
        <CustomButton variant="contained">Create Blog</CustomButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <StyledLink to={`/?category=${category.type}`}>
                    {category.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </Fragment>
  );
};
export default Categories;
