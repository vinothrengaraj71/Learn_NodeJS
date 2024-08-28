import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "2%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              value={loginInfo.email}
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginInfo.password}
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
            <Button variant="primary" type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? "Loading..." : "Login"}
            </Button>
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError?.msg || "An error occurred"}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
