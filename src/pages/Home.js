//import component Bootstrap React
import { Container} from 'react-bootstrap';

import List from "./Pokemon/List";

function Home() {
    return (
        <Container className="mt-3">
            <List />
        </Container>
    );
}

export default Home;