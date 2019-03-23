import React from 'react';
import { Row, Col } from 'antd';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import NavLeft from './components/NavLeft/NavLeft'
import { connect } from 'react-redux'

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav-left">
                    <NavLeft></NavLeft>
                    </Col>
                    <Col span={21} className="main">
                        
                        <Header></Header>
                        <Row className="content">
                            {/* <Home></Home> */}
                            {this.props.children}
                        </Row>
                        <Footer></Footer>

                    </Col>
                </Row>

            </div>
        )
    }
}
export default connect()(Admin)

