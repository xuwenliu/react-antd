import React from 'react';
import { Row } from 'antd';

import Header from './components/Header/Header'
import './style/common.less'

class Common extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"></Header>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}
export default Common

