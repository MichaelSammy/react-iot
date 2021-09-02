import React from 'react'
import { Modal,Button } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons';
/**
 * 二次确认框封装
 * */
class BaseModel extends React.Component {
    submitOk=()=>{
      this.props.submitOk()
    }
    submitCancel=()=>{
        this.props.submitCancel()
    }
    render(){
        return (
            <Modal
                // title={'提示'}
                closable={false}
                width={350}
                maskClosable={false}
                visible={this.props.visible}
                onOk={this.submitOk}
                onCancel={this.submitCancel}
                centered={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.submitOk}>确定</Button>,
                    <Button key="back"onClick={this.submitCancel}>取消</Button>
                ]}
            >
                <div style={{display: 'flex','padding': '15px',fontSize:'15px'}}>
                <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: "22px",marginRight:'15px' }}></ExclamationCircleOutlined>
                <div>{this.props.content}</div>
                </div>
            </Modal>
        )
    }

}

export default BaseModel



