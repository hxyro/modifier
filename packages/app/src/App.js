import { Col, Container, Row } from 'reactstrap'
import Main from './Components/main/Main'
import About from './Components/sidebar/About'
import Features from './Components/sidebar/Features'
import SideBar from './Components/sidebar/SideBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <SideBar />
      <Container fluid>
        <Row>
          <Col className="col-xl-8 offset-xl-1 mb-3">
            <Main />
          </Col>

          <Col className="aside col-lg-2 d-none d-xl-flex me-1  ps-xl-4 m-0">
            <Features />
            <About />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
