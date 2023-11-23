import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function MyPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [release, setRelease] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const myPokemonList = useSelector((state) => state.myPokemon);
  console.log("data store", myPokemonList);

  useEffect(() => {
    console.log("data effect", pokemon);
    fetchMyPokemon();
  }, [myPokemonList]);

  const fetchMyPokemon = () => {    
    localStorage.setItem("pokemons", JSON.stringify(myPokemonList));
    setPokemon(myPokemonList);
  };

  const fetchRelease = async (id) => {    
    const response = await axios.get("http://localhost:3000/release/"+id);
    //get response data
    const data = await response.data;    
    if(isPrime(data.result)){
      dispatch({
        type: "RELEASE",
        payload: {
          id: id,
        },
      });
      setRelease("Successfully Release Pokemon");
    } else {
      setRelease("Failed to Release Pokemon");
    }
    setShow(true);
  }

  const fetchRename = async (id) => {
    const [selected] = pokemon.filter((d) => d.id_my === id);
    const response = await axios.post("http://localhost:3000/rename/" + id, selected);
    //get response data
    const data = await response.data;
    if (data) {
      dispatch({
        type: "RENAME",
        payload: {
          id: id,
          name: data.name
        },
      });      
      setRelease("Successfully Rename Pokemon");
    } else {
      setRelease("Failed to Rename Pokemon");
    }
    setShow(true);
  }

  const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}

  return (
    <div>
      <Container className="mt-3">
        <Row>
          {pokemon.length > 0 ? (
            pokemon.map((post, index) => (
              <Col lg="3" md="6" xs="12" className="p-1">
                <Card>
                  <Card.Img variant="top" src={post.sprite} />
                  <Card.Body>
                    <Card.Title>{post.name}</Card.Title>
                    <Card.Text>
                      {post.stats.map((stat, index) => (
                        <Row>
                          <Col xs="8">
                            <p className="my-1">{stat.name}</p>
                          </Col>
                          <Col xs="4">{stat.value}</Col>
                        </Row>
                      ))}
                    </Card.Text>
                    <Button
                      as={Link}
                      onClick={() => fetchRelease(post.id_my)}
                      variant="primary"
                      size="sm"
                      className="me-2"
                    >
                      Release
                    </Button>
                    <Button
                      as={Link}
                      onClick={() => fetchRename(post.id_my)}
                      variant="primary"
                      size="sm"
                      className="me-2"
                    >
                      Name
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col lg="12" md="12" xs="12" className="p-1">
              <Alert variant="danger">You Don't Have a Pokemon</Alert>
            </Col>
          )}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Release Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{release}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyPokemon;
