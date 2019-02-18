import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less'

const SubMenu = Menu.SubMenu;


export default class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: []
        }
    }

    //组件即将挂载-->render函数还未执行
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
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
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme='dark'>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }


    //组件已经挂载好了-->render函数执行完毕--->用的最多-常用来发起Ajax请求
    componentDidMount() {

    }

    //props变化了-->接受到了新的props
    componentWillReceiveProps(nextProps) {

    }

    //props或者state变化了-->接受到了新的props或者state
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    //即将更新-->render函数还未执行
    componentWillUpdate(nextProps, nextState) {

    }

    //更新完毕-->render函数执行完毕
    componentDidUpdate(prevProps, prevState) {

    }

    //销毁之前
    componentWillUnMount() {

    }


}
