import { Container } from "react-bootstrap";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <Container fluid="xl" className="p-4 position-sticky top-0 bg-white">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="d-flex gap-4 align-items-center">
          <Link to="/new-task">New Task</Link>
          <Link to="/all-task">All Task</Link>
          <img src={avatar} alt="profileimg" />
        </div>
      </div>
    </Container>
  );
}
