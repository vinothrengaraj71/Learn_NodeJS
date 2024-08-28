import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "2%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              {/* <h2>{user.name}</h2> */}

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    username: e.target.value,
                  })
                }
              />
              <Form.Control
                type="file"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, image: e.target.files[0] })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="Password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Creating Your Account" : "Register"}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message || "An error occurred"}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
