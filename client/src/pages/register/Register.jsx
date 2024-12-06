import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/user";
import { toast } from "sonner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ username, email, password });
      if (res.status === 201) {
        toast.success(res.data.msg);
        localStorage.setItem(
          "taskDutyToken",
          JSON.stringify(res.data.accessToken)
        );
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response?.data?.error);
      } else {
        setError(error.response?.data || error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid="xl" className="p-4">
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        {error && <p className="my-4">{error} </p>}
        <Form onSubmit={handleSubmit} className="border p-3">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              size="lg"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              size="lg"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              size="lg"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            disabled={loading}
            className="w-100"
          >
            {loading ? "Registering..." : "Sign up"}
          </Button>
        </Form>
        <div className="mt-4 text-center">
          <p>Have an account </p>
          <Link to="/login" className="fw-bold">
            Sign in
          </Link>
        </div>
      </div>
    </Container>
  );
}
