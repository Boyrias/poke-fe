import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button} from "react-bootstrap";
import axios from "axios";

function List() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/pokemon-list");
    //get response data
    const data = await response.data;
    let poke = await Promise.all(data.map(async (d) => {
      const detail = await axios.get("http://localhost:3000/pokemon-detail/"+d.id);
      return {
        ...d,
        sprite : detail.data.sprite,
        stats : detail.data.stats
      }
    }));    
    console.log(poke);

    setPokemon(poke);
  };

  return (
    <Container className="mt-3">      
      <Row>
        {pokemon.map((post, index) => (
          <Col lg="3" md="6" xs="12" className="p-1">
            <Card>
              <Card.Img variant="top" src={post.sprite} />
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                  {post.stats.map((stat, index) =>(
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
                  to={`/detail/${post.id}`}
                  variant="primary"
                  size="sm"
                  className="me-2"
                >
                  Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default List;
