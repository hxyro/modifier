import Example from "./Example";
import Intro from "./Intro";
import { Col, Container, Row } from "reactstrap";

function Main() {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col className="col-12 col-lg-8">
          <Intro />
        </Col>
      </Row>
      <Container fluid>
        <Row>
          <Col className="col-12  text-center">
            <Example />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Main;
