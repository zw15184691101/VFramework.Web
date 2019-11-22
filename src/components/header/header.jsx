import React, { Component } from 'react'
import { Modal} from 'antd';
import { withRouter } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils"
import storageUtils from "../../utils/storageUtils"
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import "./header.less"
import logo from "../../assets/images/logo192.png"
class Header extends Component {
    constructor(){
        super()
        this.state = {
            time:formateDate(Date.now())
        }
    }
    /* 
    退出登陆
    */
    logout = () => {
    Modal.confirm({
        title: '确定退出登陆吗?',
        width:"300px",
        onOk:() => {
            //删除本地user
            storageUtils.removeUser()
            //删除内存user
            memoryUtils.user = {}
            //跳转到登陆页面    
            this.props.history.replace("/login")
        },
        onCancel() {}
        })
    }

    /* 
    获取当前页面标题
    */
    getTitle = ()=>{
        const path = this.props.location.pathname
        let title = ''
        menuList.forEach(item=>{
            if (item.key === path) {
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    componentDidMount(){
        //开启定时器
        this.timeId = setInterval(() => {
            this.setState({
                time:formateDate(Date.now())
            })
        }, 1000);
    }

    componentWillMount(){
        //关闭定时器
        clearInterval(this.timeId)
    }
    render() {
        const {time} = this.state
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                <span>欢迎，{user.username} </span>
                <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left"><span>{title}</span></div>
                    <div className="header-bottom-right">
                        <span>{time}</span>
                        <img src={logo} alt="logo"/>
                        <span>多云雷阵雨</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
