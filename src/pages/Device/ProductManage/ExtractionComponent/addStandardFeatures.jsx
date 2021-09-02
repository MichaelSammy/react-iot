import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import './../index.less'

class AddStandardFeatures extends React.Component {
    state = {
        visible: false,
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    requestList() {

    }

    render() {
        return (
            <div>
                <Drawer
                    title="添加标准功能点"
                    width={560}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div className="product-drawer-close">
                            <div onClick={this.onClose} type="primary">
                                关闭
                            </div>
                        </div>
                    }
                >
                    xxx
                </Drawer>
            </div>
        )
    }
}

export default AddStandardFeatures
