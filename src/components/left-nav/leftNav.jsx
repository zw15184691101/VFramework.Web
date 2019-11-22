//左则导航组件
import React, { Component } from 'react'
import { Link ,withRouter} from "react-router-dom";
import { Menu, Icon} from 'antd';
import menuList from "../../config/menuConfig";
import "./leftNav.less"
import logo from "../../assets/images/logo192.png"

const { SubMenu } = Menu;

class LeftNav extends Component {
    UNSAFEcomponentWillMount(){
        this.menuNodes = this.getMenu(menuList)
    }
    getMenu = (menuList) => {
        const path = this.props.location.pathname//取当前路由
        return menuList.map(item => {
            if (!item.children) {
               return (
                <Menu.Item key={item.key}>
                <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                </Link>
                </Menu.Item>
               ) 
            }else{
                const cItem = item.children.find(cItem=>cItem.key === path)
                if (cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        const menuNodes = this.getMenu(menuList)
        const routeKey = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link className="left-nav-header" to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>易联后台</h1>
                </Link>
                <Menu
                selectedKeys={[routeKey]}
                defaultOpenKeys={[this.openKey]}
                mode="inline"
                theme="dark"
                >
                    {
                        menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

const withRouterMenu = withRouter(LeftNav)
export default withRouterMenu
