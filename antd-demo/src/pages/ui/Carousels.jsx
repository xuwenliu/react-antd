import React from 'react';

import { Card,Carousel} from 'antd';

export default class Carousels extends React.Component {
    state = {};

    afterChange = (currentIndex)=>{
        console.log('afterChange--currentIndex->',currentIndex)
    }

    beforeChange = (from,to) => {
        console.log('beforeChange--from->',from)
        console.log('beforeChange--to->',to)
        
    }

    render() {
        return (
            <div>
                <Card title="文字背景轮播">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>

                <Card title="图片轮播" className="slider-wrap">
                    <Carousel autoplay afterChange={this.afterChange} beforeChange={this.beforeChange}>
                        <div><img src="/react-antd/assets/img/carousel-img/carousel-1.jpg" alt=""/></div>
                        <div><img src="{{site.baseurl}}/assets/img/carousel-img/carousel-2.jpg" alt=""/></div>
                        <div><img src="{{ site.baseurl }}/assets/img/carousel-img/carousel-3.jpg" alt=""/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }

    


}


