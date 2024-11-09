import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AllTask() {
  return (
    <Container fluid="xl" className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>All Tasks</h1>
        <Link to="/new-task">
          <button className="addTaskBtn">+ Add New Task</button>
        </Link>
      </div>
    </Container>
  );
}
