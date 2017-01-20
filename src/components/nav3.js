import React from 'react';
import {
	Popup,
	List,
	Button,
	InputItem
} from 'antd-mobile';

class PopupContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sel: '',
		}
	}

	onSel = (sel) => {
		this.setState({
			sel
		});
		this.props.onClose();
	}

	render() {
		return (
			<List renderHeader={() => `账户总览，选择了：${this.state.sel}`}>
        <List.Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => { this.onSel('东吴证券'); }}
        >东吴证券</List.Item>
        <List.Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => { this.onSel('西吴证券'); }}
        >西吴证券</List.Item>
        <InputItem value={this.state.val} onChange={(val) => this.setState({ val })}>输入内容</InputItem>
      </List>
		)
	}
}

export default class nav3 extends React.Component {

	onClick = (e) => {
		e.preventDefault(); // 修复 Android 上点击穿透
		Popup.show(<PopupContent onClose={() => Popup.hide()} />, {
			onMaskClose: this.onMaskClose
		});
	}

	onMaskClose = () => {
			console.log('onMaskClose');
			// also support Promise
			// return new Promise((resolve) => {
			//   console.log('1000ms 后关闭');
			//   setTimeout(resolve, 1000);
			// });
		}
		// newInstance() {
		//  const ins = Popup.newInstance();
		//  ins.show(<Button onClick={() => ins.hide()}>关闭</Button>);
		// },

	render() {
		return (
			<div style={{ padding: '0.15rem' }}>
      <Button onClick={this.onClick}>显示</Button>
    </div>
		)
	}

}