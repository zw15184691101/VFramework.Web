import React, { Component } from 'react'
import { Redirect,Switch,Route } from "react-router-dom"
import { Layout } from 'antd'
import LeftNav from "../../components/left-nav/leftNav"
import Header from "../../components/header/header"
import Home from "../home/home"
import System from "../system/system"
import Merchant from "../merchant/merchant"
import Order from "../order/order"
import AddMerchant from "../../views/addMerchant/addMerchant"
import Channel from "../../views/channel/channel"
import AddChannel from "../../views/addChannel/addChannel"
import memoryUtils from "../../utils/memoryUtils"
import proxyOrder from '../../views/proxyOrder/proxyOrder'


const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user.id) {
            //this.props.history.replace("/login")
            return<Redirect to="/login" />//自动跳转到指定的路由路径
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                <Header>Header</Header>
                <Content style={{backgroundColor:"white",margin:"20px"}}>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/merchant" component={Merchant} />
                        <Route path="/addMerchant" component={AddMerchant} />
                        <Route path="/order" component={Order} />
                        <Route path="/proxyOrder" component={proxyOrder} />
                        <Route path="/channel" component={Channel} />
                        <Route path="/addChannel" component={AddChannel} />
                        <Route path="/system" component={System} />
                        <Redirect to="/home" />
                    </Switch>
                </Content>
                <Footer style={{textAlign:"center",color:"rgb(0,0,0,0.5)",backgroundColor:"white",padding:"20px"}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
