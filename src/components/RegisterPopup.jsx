import React, { Component } from 'react';

import {
  Form, Icon, Input, Button, Modal,
} from 'antd';

import Http from 'axios';

class RegisterPopup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            disableButton: false,
            hideMessage: 'none',
            buttonMessage: 'Send',
            errorMessage: 'Server Internal Error!'
        };
    }


    handleSubmit() {
        if(!this.state.disableButton) {
            this.props.form.validateFields((err, values) => {
                if (err) {
                  return;
                }else{
                    if(values.email !== values.confirmEmail){
                        this.setState({
                            hideMessage: 'block',
                            errorMessage: 'Two email that you enter is inconsistent!'
                        });
                        return;
                    }
                }
                this.register(values);
            });
        }
    }

/*     compareToFirstEmail(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('email')) {
            this.setState({
                hideMessage: 'block',
                errorMessage: 'Two email that you enter is inconsistent!'
            });
        }
    } */
    

    // send invitation request
    register(values) {
        this.setState({
            loading: true, 
            disableButton: true,
            buttonMessage: 'Sending, please wait...',
            hideMessage: 'none'
        });
        let url = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
        //let data = { "name":"1234", "email":"userdemail@airwallex.com" };

        Http.post(url, {
            "name": values.userName, 
            "email": values.email
        }).then(res => {
        
            if("Registered" === res.data) {
                this.props.close()
                Modal.success({
                    title: 'All Done!',
                    content: 'You will be one of the first to experience Broccoli & Co. When we launch',
                    okText: 'OK',
                    okType: 'primary',
                    centered: true,
                });
            }else{
                this.setState({
                    loading: false,
                    disableButton: false,
                    buttonMessage: 'Send',
                    hideMessage: 'block',
                    errorMessage: 'The email is already in use!'
                });
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                loading: false,
                disableButton: false,
                buttonMessage: 'Send',
                hideMessage: 'block',
                errorMessage: 'Server Internal Error!'
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onClick={()=>this.handleSubmit()} className="login-form" >
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your fullname!' }, {min: 3, message: 'Full name needs to be at least 3 characters'}],
                })(
                    <Input prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full name" allowClear />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('email', {
                    rules: [ { required: true, message: 'Please input your E-mail!' }, {type: 'email', message: 'The input is not valid E-mail!'}],
                })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" allowClear />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('confirmEmail', {
                    rules: [{ required: true, message: 'Please confirm your E-mail!' }, {type: 'email', message: 'The input is not valid E-mail!'}],
                })(
                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Confirm email" allowClear />
                )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block disabled={this.state.disableButton} loading={this.state.loading}> {this.state.buttonMessage} </Button>
            <div style={{display: this.state.hideMessage, color: 'red', textAlign: 'center', marginTop: '10px'}}>{this.state.errorMessage}</div>
        </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(RegisterPopup);

export default WrappedNormalLoginForm