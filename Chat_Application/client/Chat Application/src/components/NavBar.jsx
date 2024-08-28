import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <h2>
            <Link to="/" className="link-light text-decoration-none">
              Void Chat App
            </Link>
          </h2>

          {user && (
            <>
              <span className="text-success">
                {" "}
                Logged in as {user.name}
                {/* Logged in as {user?.user.name} */}
              </span>
            </>
          )}
          {!user && (
            <>
              <span className="text-success">
                {" "}
                Not logged in
              </span>
            </>
          )}
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user && (
                <>
                  <Link
                    onClick={logoutUser}
                    to="/login"
                    className="link-light text-decoration-none"
                  >
                    Logout
                  </Link>
                </>
              )}
              {!user && (
                <>
                  <Link to="/login" className="link-light text-decoration-none">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="link-light text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
