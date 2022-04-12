import React from "react";
import {
  Button,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { categories } from "../../constant";
import { useHistory } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalState } from "../GlobalState/Globalstate";
const style = makeStyles({
  button: {
    backgroundColor: "#6495ED",
    color: "white",
    margin: 20,
    width: "86%",
    fontWeight: "bold",
  },
 
  TableCell: {
    border: "1px solid rgba(224,224,224,1)",
    fontWeight: "bold",
    textTransform: "capitalize",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#6495ED",
      color: "white",
    },
  },
});
export default function Categories() {
  let classes = style();
    const history = useHistory();
    const [isAuthenticated, setAuthenticated] = useGlobalState("Authenticated");

//   const { isAuthenticated } = useAuth0();

  const search = (item) => {
    history.push(`/?categories=${item}`);
  };
  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={
            isAuthenticated
                ? () => history.push("/Create_blog")
                : () => {
                    alert("Please login first");
                    history.push("/login");
                    
                }
        }>
        Create Blog
      </Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.TableCell}
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => history.push("/")}>
              All Categories
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell
                  onClick={ () => search(item)  }
                  className={classes.TableCell}
                  style={{ cursor: "pointer", fontWeight: "bold" }}>
                  {item}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
