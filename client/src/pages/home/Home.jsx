import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";

export default function Home() {
  return (
    <Container fluid="xl" className="p-4">
      <div className="d-md-flex justify-content-between align-items-center py-4">
        <div className="hero">
          <h1 className="fw-bold">
            Manage your Tasks on <br /> <span>TaskDuty</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <Link to="/my-tasks">
            <button>Go to My Tasks</button>
          </Link>
        </div>
        <div className="heroImg">
          <img src={heroImg} alt="hero-img" className="img-fluid" />
        </div>
      </div>
    </Container>
  );
}
