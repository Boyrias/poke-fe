//import component Bootstrap React
import { Navbar, Container, Nav } from "react-bootstrap";

//import react router dom
import { Routes, Route, Link } from "react-router-dom";

//import component Home
import Home from "./pages/Home";
import List from "./pages/Pokemon/List";
import Detail from "./pages/Pokemon/Detail";
import MyPokemon from "./pages/Pokemon/MyPokemon";

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">PokeDex</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                Pokemon List
              </Nav.Link>
              <Nav.Link as={Link} to="/myPokemon" className="nav-link">
                My Pokemon List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/lists" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/myPokemon" element={<MyPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
