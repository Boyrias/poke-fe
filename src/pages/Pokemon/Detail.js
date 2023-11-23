import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button, Accordion, ListGroup, Modal, Alert} from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Detail() {
  const [pokemon, setPokemon] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [show, setShow] = useState(false);
  const [catching, setCatching] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  
  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    console.log("id data", id);
    const response = await axios.get("http://localhost:3000/pokemon-detail/"+id);
    //get response data
    const data = await response.data;    
    console.log("data detail", data);
    setPokemon(data);
    setIsFetch(true);
  };

  const fetchCatch = async () => {
    const response = await axios.get("http://localhost:3000/catch/"+id);
    const data = await response.data;
    setCatching(data.message);
    if(data.status){
      dispatch({
        type: "CATCH",
        payload: pokemon,
      });
    }
    setShow(true);
  }

  return (
    <div>
      {!isFetch ? (
        <Alert key="light" variant="light">
          Loading, Please Wait...
        </Alert>
      ) : (
        <div>
          <Container className="mt-3">
            <Row>
              <Col lg="8" xs="12" className="p-1" style={{margin: "0 auto"}}>
                <Card bg="light">
                  <Card.Header>
                    <Card.Img
                      variant="top"
                      src={pokemon.sprite}
                      style={{
                        display: "block",
                        height: "240px",
                        width: "auto",
                        margin: "0 auto",
                      }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                      <Row>
                        <Col xs="6">
                          <p className="my-1">Base Experience</p>
                        </Col>
                        <Col xs="6">{pokemon.base_experience}</Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <p className="my-1">Height</p>
                        </Col>
                        <Col xs="6">{pokemon.height}</Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <p className="my-1">Weight</p>
                        </Col>
                        <Col xs="6">{pokemon.weight}</Col>
                      </Row>
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Stats</Accordion.Header>
                          <Accordion.Body>
                            {console.log("typeof ", pokemon)}
                            {pokemon.stats.map((stat, index) => (
                              <Row key={index}>
                                <Col xs="6">
                                  <p className="my-1">{stat.name}</p>
                                </Col>
                                <Col xs="6">{stat.value}</Col>
                              </Row>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Types</Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                              {pokemon.types.map((type, index) => (
                                <ListGroup.Item key={index}>
                                  {type}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>Types</Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                              {pokemon.abilities.map((ability, index) => (
                                <ListGroup.Item key={index}>
                                  {ability}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>Moves</Accordion.Header>
                          <Accordion.Body>
                            <ListGroup>
                              {pokemon.moves.map((move, index) => (
                                <ListGroup.Item key={index}>
                                  {move}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        className="me-2"
                        onClick={fetchCatch}
                      >
                        Catch
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Catch Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>{catching}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Detail;
