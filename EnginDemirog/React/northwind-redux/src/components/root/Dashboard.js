import React from 'react'
import ProductList from '../products/ProductList';
import {Row,Col} from 'reactstrap'
import CategoryList from '../categories/CategoryList';

 function Dashboard() {//Category ve Product imizin icinde olacagi componenttir
    return (
        <div>
            <Row>
                <Col xs="3">
                    <CategoryList/>
                </Col>
                <Col xs="9">
                    <ProductList/>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;