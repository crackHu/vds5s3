import React from 'react';
import {
	List,
	TextareaItem,
	ListView,
	Result,
	Toast,
	WhiteSpace,
	WingBlank,
	Button,
	Grid,
} from 'antd-mobile';
import {
	createForm
} from 'rc-form';

let TextareaItemExample = React.createClass({
	render() {
		const {
			getFieldProps
		} = this.props.form;
		return (<List>
      <TextareaItem
        title="标题"
        placeholder="请输入"
        data-seed="logId"
        autoFocus autoHeight
      />
      <TextareaItem
        {...getFieldProps('control')}
        title="标题"
        placeholder="请输入（受控）"
      />

      <TextareaItem
        {...getFieldProps('clear1')}
        clear
        title="标题"
        placeholder="输入会显示清除按钮"
      />

      <TextareaItem
        {...getFieldProps('note8', {
          initialValue: '报错样式',
        })}
        title="报错样式"
        rows={5}
        error
        onErrorClick={() => { alert('点击报错'); }}
        count={100}
      />

      <TextareaItem
        {...getFieldProps('note2')}
        title="单行显示"
        placeholder="请填写"
      />
      <TextareaItem
        {...getFieldProps('note4')}
        placeholder="最多输入10个字符"
        count={10}
      />
      <TextareaItem
        {...getFieldProps('count', {
          initialValue: '计数功能,我的意见是...',
        })}
        rows={5}
        count={100}
      />

      <TextareaItem
        {...getFieldProps('note3')}
        title="高度自适应"
        autoHeight
        labelNumber={5}
      />
      <TextareaItem
        {...getFieldProps('note1')}
        rows={3}
        placeholder="固定行数,rows"
      />
      <TextareaItem
        {...getFieldProps('title3')}
        title={<img src="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" style={{ width: '0.56rem', height: '0.56rem' }} />}
        placeholder="标题可以自定义"
      />

      <TextareaItem
        {...getFieldProps('note6', {
          initialValue: '不可编辑',
        })}
        title="姓名"
        editable={false}
      />
      <TextareaItem
        value="这个是禁用的样式"
        title="姓名"
        disabled
      />
    </List>);
	},
});

TextareaItemExample = createForm()(TextareaItemExample);

const data = [{
	img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
	title: '相约酒店',
	des: '不是所有的兼职汪都需要风吹日晒',
}, {
	img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
	title: '麦当劳邀您过周末',
	des: '不是所有的兼职汪都需要风吹日晒',
}, {
	img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
	title: '食惠周',
	des: '不是所有的兼职汪都需要风吹日晒',
}, ];
const data2 = Array.from(new Array(9)).map((_val, i) => ({
	icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
	text: `名字${i}`,
}));

const data1 = Array.from(new Array(5)).map((_val, i) => ({
	img: 'https://zos.alipayobjects.com/rmsportal/wIjMDnsrDoPPcIV.png',
	text: `名字${i}`,
}));
let index = data.length - 1;

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const ResultExample = () => (<div>
  <p style={{ margin: 10, color: '#999' }}>支付成功</p>
  <Result
    imgUrl="https://zos.alipayobjects.com/rmsportal/yRUDxcBPvzZTDHK.png"
    title="支付成功"
    message={<div><div style={{ fontSize: '0.72rem', color: '#000', lineHeight: 1 }}>998.00</div> < del > 1098 元 < /del></div >
}
/>

< p style = {
	{
		margin: 10,
		color: '#999'
	}
} > 验证成功 < /p> < Result
imgUrl = "https://zos.alipayobjects.com/rmsportal/hbTlcWTgMzkBEiU.png"
title = "验证成功"
message = "所提交内容已成功完成验证" / >

	<p style={{ margin: 10, color: '#999' }}>支付失败</p> < Result
imgUrl = "https://zos.alipayobjects.com/rmsportal/LUIUWjyMDWctQTf.png"
title = "支付失败"
message = "所选银行卡余额不足" / >

	<p style={{ margin: 10, color: '#999' }}>等待处理</p> < Result
imgUrl = "https://zos.alipayobjects.com/rmsportal/gIGluyutXOpJmqx.png"
title = "等待处理"
message = "已提交申请，等待银行处理" / >

	<p style={{ margin: 10, color: '#999' }}>操作失败</p> < Result
imgUrl = "https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png"
title = "无法完成操作"
message = "由于你的支付宝账户还未绑定淘宝账户请登请登录www.taobao.com" / >
	< /div>);

function showToast() {
	Toast.info('这是一个 toast 提示!!!');
}

function successToast() {
	Toast.success('加载成功!!!');
}

function failToast() {
	Toast.fail('加载失败!!!', 1);
}

function offline() {
	Toast.offline('网络连接失败!!!');
}

function loadingToast() {
	Toast.loading('加载中...', 1, () => {
		console.log('加载完成!!!');
	});
}

export default class nav1 extends React.Component {

	constructor(props) {
		super(props);

		const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
		const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

		const dataSource = new ListView.DataSource({
			getRowData,
			getSectionHeaderData: getSectionData,
			rowHasChanged: (row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.dataBlob = {};
		this.sectionIDs = [];
		this.rowIDs = [];
		this.genData = (pIndex = 0) => {
			for (let i = 0; i < NUM_SECTIONS; i++) {
				const ii = (pIndex * NUM_SECTIONS) + i;
				const sectionName = `Section ${ii}`;
				this.sectionIDs.push(sectionName);
				this.dataBlob[sectionName] = sectionName;
				this.rowIDs[ii] = [];

				for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
					const rowName = `S${ii}, R${jj}`;
					this.rowIDs[ii].push(rowName);
					this.dataBlob[rowName] = rowName;
				}
			}
			// new object ref
			this.sectionIDs = [].concat(this.sectionIDs);
			this.rowIDs = [].concat(this.rowIDs);
		};
		this.genData();

		this.state = {
			dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
			isLoading: false,
		}
	}

	onEndReached = (event) => {
		// load new data
		console.log('reach end', event);
		this.setState({
			isLoading: true
		});
		setTimeout(() => {
			this.genData(++pageIndex);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
				isLoading: false,
			});
		}, 1000);
	}

	render() {


		const separator = (sectionID, rowID) => ( < div key = {
				`${sectionID}-${rowID}`
			}
			style = {
				{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED',
				}
			}
			/>
		);
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return ( < div key = {
					rowID
				}
				style = {
					{
						padding: '0.08rem 0.16rem',
						backgroundColor: 'white',
					}
				} >
				<h3 style={{ padding: 2, marginBottom: '0.08rem', borderBottom: '1px solid #F6F6F6' }}>
	            {obj.title}
	          </h3> < div style = {
					{
						display: '-webkit-box',
						display: 'flex'
					}
				} >
				<img style={{ height: '1.28rem', marginRight: '0.08rem' }} src={obj.img} /> < div style = {
					{
						display: 'inline-block'
					}
				} >
				<p>{obj.des}</p> < p > <span style={{ fontSize: '1.6em', color: '#FF6E27' }}>35</span>
				元 / 任务 < /p> < /div > < /div> < /div >
			);
		};

		return (
			<div>
			< TextareaItemExample / >
			<div>
      <Grid data={data2} />

      <p style={{ margin: 10, color: '#999' }}>无边线</p>
      <Grid data={data2} columnNum={3} hasLine={false} />

      <p style={{ margin: 10, color: '#999' }}>走马灯</p>
      <Grid data={data2} columnNum={3} isCarousel onClick={(_el, index) => alert(index)} />

      <p style={{ margin: 10, color: '#999' }}>自定义格子内容</p>
      <Grid data={data1} columnNum={3} hasLine={false}
        renderItem={(dataItem, index) => (
          <div style={{ margin: '0.16rem', background: '#f7f7f7', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.1)', padding: '0.08rem' }}>
              <span>{index + 1}.{dataItem.text}</span>
            </div>
            <img src={dataItem.img} style={{ width: '80%', margin: '0.12rem' }} />
          </div>
        )}
      />
    </div>
				<ResultExample />
				<WingBlank>
        <WhiteSpace />
        <Button onClick={showToast}>纯文字 toast</Button>
        <WhiteSpace />
        <Button onClick={successToast}>成功 toast</Button>
        <WhiteSpace />
        <Button onClick={failToast}>失败 toast</Button>
        <WhiteSpace />
        <Button onClick={offline}>网络 toast</Button>
        <WhiteSpace />
        <Button onClick={loadingToast}>加载中 toast</Button>
        <WhiteSpace />
      </WingBlank>
						<ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>
		}
		renderSectionHeader = {
			(sectionData) => (
				<div>{`任务 ${sectionData.split(' ')[1]}`}</div>
			)
		}
		renderRow = {
			row
		}
		renderSeparator = {
			separator
		}
		className = "am-list"
		pageSize = {
			4
		}
		scrollEventThrottle = {
			20
		}
		onScroll = {
			() => {
				console.log('scroll');
			}
		}
		onEndReached = {
			this.onEndReached
		}
		onEndReachedThreshold = {
			10
		}
		stickyHeader
		stickyProps = {
			{
				stickyStyle: {
					zIndex: 999,
					WebkitTransform: 'none',
					transform: 'none'
				},
				// topOffset: -43,
				// isActive: false, // 关闭 sticky 效果
			}
		}
		/>   < /div >
	)
}
}