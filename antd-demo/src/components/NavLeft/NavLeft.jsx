import React from 'react';
import MenuConfig from '../../config/menuConfig';
import Utils from '../../utils/utils';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './navLeft.less';
import { connect } from 'react-redux'

// import store from '../../pages/redux-thunk-demo/store/store';
import getAction from '../../pages/redux-thunk-demo/actionCreators/getAction';


const SubMenu = Menu.SubMenu;


class NavLeft extends React.Component {
    state = {
        menuList: [],
        currentKey:'',
    }

    //组件即将挂载-->render函数还未执行
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })

    }
    componentDidMount() {
        // store.dispatch(getAction.getIndexTitleAction('首页'));
        // this.props.dispatch();
        let key = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState(()=>{
            return {
                currentKey:key
            }
        })
        //每次刷新浏览器就触发一次action
        this.renderTitle(MenuConfig,key);
       

    }

    renderTitle = (data,key) => {
        data.map(item => {
            if (item.key === key) {
                this.props.dispatch(getAction.getIndexTitleAction(item.title));
                return;
            } 
            if (item.children) {
                this.renderTitle(item.children,key);
            } 
        })
    }

    handleClick = ({item,key})=>{
        if (key === this.state.currentKey) {
            return false;
        }
        this.setState(()=>{
            return {
                currentKey:key
            }
        })
        this.props.dispatch(getAction.getIndexTitleAction(item.props.title));
    }   

    //菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>

        })
    }


    render() {
        return (
            <div>
                <div className="logo">
                    <img src={`${Utils.cdnUrl}/assets/img/me.png`} alt="" />
                    <h1>Sys</h1>
                </div>
                <Menu 
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    theme='dark'>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft);