import React, { Component } from 'react'
import { Form, Icon, Input, Button,message } from 'antd';
import { Redirect } from "react-router-dom";
//import { reqLogin } from "../../api";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import './login.less'
import logo from '../../assets/images/logo192.png'

const resData = {
    status:0,
    data:{
        id:1,
        username:"admin",
    }
}

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();//阻止默认事件

        this.props.form.validateFields(async (err, {username,password}) => {
            if (!err) {
               //const result = await reqLogin(username,password)
               if (username === "admin" && password === "admin") {
                const user = resData.data
                //登陆成功，将user写入localStorage
                storageUtils.setUser(user)
                memoryUtils.user = user

                //跳转到管理页面
                this.props.history.replace('/')
               message.success("登陆成功")
               }else{
                   message.error('账号或密码不正确')
               }
            }
        });
    };
      
    //密码验证
    validatorPwd = (rule, value, callback)=>{
        value = value.trim()
        if (!value) {
            callback('密码不能为空')
        }else if (value.length < 4) {
            callback('密码长度不能小于4位')
        }else if (value.length > 12) {
            callback('密码长度不能大于12位')
        }else if (!/^[0-9a-zA-Z_]+$/.test(value)) {
            callback('密码必须是英文、数字下划线组成')
        }else{
            callback()
        }
    }

    render() {
        const user = memoryUtils.user
        if (user.id) {
            return <Redirect to="/"/>
        }
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登陆</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                            getFieldDecorator("username",{
                                initialValue:'',
                                rules:[//声明式验证
                                    {required:true,message:'用户名不能为空',whitespace:true},
                                    {min:4,message:'用户名不能小于4位'},
                                    {max:12,message:'用户名不能大于12位'},
                                    {pattern:/^[0-9a-zA-Z_]+$/,message:'用户名必须是英文、数字下划线组成'}
                                ]
                                }
                            )(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                                />
                            )}
                            
                        </Form.Item>
                        <Form.Item>
                        {
                            getFieldDecorator("password",{
                                initialValue:'',
                                rules:[{validator:this.validatorPwd}]
                                }
                            )(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="用户密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >登 陆</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrapperForm = Form.create()(Login)
export default WrapperForm
