import React from 'react';
import { Row,Col,Card,Modal } from 'antd';

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentImg:''
        }
    }

    openGallery = (imgUrl) => {
        this.setState({
            visible: true,
            currentImg:'/assets/img/gallery/'+imgUrl
        })
    }

    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ]
        const imgList = imgs.map((list)=>
            list.map(item=>
                <Card style={{marginBottom:10}}
                    cover={<img alt={item} src={'/assets/img/gallery/' + item} />}
                    onClick={()=>this.openGallery(item)}
                   
                >
                <Card.Meta
                    title="React antd gallery画廊"
                    description="www.google.com"
                    />
                </Card>
            )
        );
        return (
            <div className="card-warp">
                <Row gutter={10}>
                    {
                        imgList.map((item,index) =>
                            <Col md={index === imgList.length-1?4:5}>{item}</Col>
                        )
                    }
                    {/* <Col md={5}></Col>
                    <Col md={5}></Col>
                    <Col md={5}></Col>
                    <Col md={4}></Col> */}
                </Row>

                <Modal
                    width={300}
                    height={500}
                    title="图片画廊"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            visible:false
                        })
                    }}

                >
                    {<img src={this.state.currentImg} alt="" style={{width:'100%'}}/>}
                </Modal>
            </div>
        )
    }

    


}


