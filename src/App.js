import React, { Component } from 'react';

import { Button, Modal } from 'antd';

import RegisterPopup from './components/RegisterPopup'
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            visible: false
        };
    }

    onClose() {
        this.setState({
            visible: false,
        });
    }

    // open register popup
    showRegisterPopup(visible) {
        this.setState({
            visible
        });
    }

    render() {
        return (
            <div className="App">
                <Header/>
                
                <div className="content">
                    <h1>A better way <br/> to enjoy every day.</h1>
                    <h2>Be the first know we launch.</h2>
                    <Button type="primary" size="large" onClick={() => this.showRegisterPopup(true)}> Request an invite </Button>
                </div>

                <Modal
                    title="Request an invite"
                    centered
                    visible={this.state.visible}
                    onCancel={() => this.showRegisterPopup(false)}
                    footer={null}
                    style={{textAlign: 'center'}}
                    destroyOnClose= {true}
                >
                <RegisterPopup close={()=> this.onClose()}/>
                </Modal>
                
                <Footer/>
            </div>
        );
    }
}

export default App;
