import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './navLeft.less'
import store from '../../pages/reduxdemo/store/store';
import getAction from '../../pages/reduxdemo/actionCreators/getAction';


const SubMenu = Menu.SubMenu;


export default class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            currentKey:'',
        }
    }

    //组件即将挂载-->render函数还未执行
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })

    }
    componentDidMount() {
        store.dispatch(getAction.getIndexTitleAction('首页'));
    }

    handleClick = ({item,key})=>{
        console.log(item)
        console.log(key)
        if (key === this.state.currentKey) {
            return false;
        }
        this.setState(()=>{
            return {
                currentKey:key
            }
        })
        store.dispatch(getAction.getIndexTitleAction(item.props.title));
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
                    <img src="/assets/img/logo-ant.svg" alt="" />
                    <h1>heng Sys</h1>
                </div>
                <Menu 
                    onClick={this.handleClick}
                    theme='dark'>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
