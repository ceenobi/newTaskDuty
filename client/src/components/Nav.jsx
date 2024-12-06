import { Container, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Nav({ loggedUser }) {
  const token = JSON.parse(localStorage.getItem("taskDutyToken"));
  const handleLogout = () => {
    localStorage.removeItem("taskDutyToken");
    toast.info("Logged out successfully");
    window.location.replace("/");
  };

  return (
    <Container fluid="xl" className="p-4 position-sticky top-0 bg-white">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        {token ? (
          <div className="d-flex gap-4 align-items-center">
            <Link to="/new-task">New Task</Link>
            <Link to="/all-task">All Task</Link>
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <img src={avatar} alt="profileimg" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  Hi, {loggedUser?.username}
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </Container>
  );
}
