import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import { Container, Row, Col } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs="6"></Col>
          <Col xs="6">
            <Navi />
          </Col>
        </Row>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/product" element={<Dashboard />} />
          <Route exact path="/saveproduct:productId" element={<AddOrUpdateProduct/>} />
          <Route exact path="/cart" element={<CartDetail/>}/>
      </Routes>
      </Container>
    </div>
  );
}

export default App;
//  <Route exact path="*" element={<NotFound />} />
//  <Route exact path="/cart" element={<CartDetail/>}/>