import React from "react";
import { Card, Tabs, message, Icon, Radio } from "antd";
import "./ui.less";

export default class Tabpages extends React.Component {
    newTabIndex = 0;

    panes = [
        { title: "Tab 1", content: "Content of Tab 1", key: "1" },
        { title: "Tab 2", content: "Content of Tab 2", key: "2" },
        {
            title: "Tab 3",
            content: "Content of Tab 3",
            key: "3",
            closable: false
        }
    ];
    state = {
        mode: "top",
        size: "default",
        activeKey: this.panes[0].key,
        panes:this.panes
    };

    handleTab = key => {
        message.info("选择了Tab" + key, 3);
    };

    handleChangeMode = e => {
        this.setState({
            mode: e.target.value
        });
    };

    handleChangeSize = e => {
        this.setState({
            size: e.target.value
        });
    };

    onChange = activeKey => {
        this.setState({
            activeKey
        });
    };

    onEdit = (targetKey, action) => {
        // console.log(action);
        // console.log(targetKey);
        //action= 'remove' | 'add'
        this[action](targetKey);
    };

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: activeKey,
            content: `New Tab Pane${activeKey}`,
            key: activeKey
        });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        console.log(targetKey);
        console.log(this.state.activeKey);
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                        <Tabs.TabPane tab="首页" key="1">
                            我是首页内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="财富" key="2">
                            我是财富内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="出境" key="3" disabled>
                            我是出境内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="朋友" key="4">
                            我是朋友内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="我的" key="5">
                            我是我的内容。。。
                        </Tabs.TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图标页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="android" />
                                    android
                                </span>
                            }
                            key="1"
                        >
                            我是android内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="apple" />
                                    apple
                                </span>
                            }
                            key="2"
                        >
                            我是apple内容。。。
                        </Tabs.TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab方向/大小控制" className="card-wrap">
                    <Radio.Group
                        value={this.state.mode}
                        onChange={this.handleChangeMode}
                        style={{ marginBottom: 20 }}
                    >
                        <Radio.Button value="top">top</Radio.Button>
                        <Radio.Button value="left">left</Radio.Button>
                        <Radio.Button value="bottom">bottom</Radio.Button>
                        <Radio.Button value="right">right</Radio.Button>
                    </Radio.Group>

                    <Radio.Group
                        value={this.state.size}
                        onChange={this.handleChangeSize}
                        style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                        <Radio.Button value="small">小</Radio.Button>
                        <Radio.Button value="default">中</Radio.Button>
                        <Radio.Button value="large">大</Radio.Button>
                    </Radio.Group>

                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.handleTab}
                        tabPosition={this.state.mode}
                        size={this.state.size}
                    >
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="android" />
                                    android
                                </span>
                            }
                            key="1"
                        >
                            我是android内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="apple" />
                                    apple
                                </span>
                            }
                            key="2"
                        >
                            我是apple内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="windows" />
                                    windows
                                </span>
                            }
                            key="3"
                        >
                            我是windows内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="ie" />
                                    ie
                                </span>
                            }
                            key="4"
                        >
                            我是ie内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="chrome" />
                                    chrome
                                </span>
                            }
                            key="5"
                        >
                            我是chrome内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="github" />
                                    github
                                </span>
                            }
                            key="6"
                        >
                            我是github内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="weibo" />
                                    weibo
                                </span>
                            }
                            key="7"
                        >
                            我是weibo内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="html5" />
                                    html5
                                </span>
                            }
                            key="8"
                        >
                            我是html5内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="qq" />
                                    qq
                                </span>
                            }
                            key="9"
                        >
                            我是qq内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="alipay" />
                                    alipay
                                </span>
                            }
                            key="10"
                        >
                            我是alipay内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="google" />
                                    google
                                </span>
                            }
                            key="11"
                        >
                            我是google内容。。。
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="taobao" />
                                    taobao
                                </span>
                            }
                            key="12"
                        >
                            我是taobao内容。。。
                        </Tabs.TabPane>
                    </Tabs>
                </Card>

                <Card title="可添加/删除" className="card-wrap">
                    <Tabs
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <Tabs.TabPane
                                tab={pane.title}
                                closable={pane.closable}
                                key={pane.key}
                            >
                                {pane.content}
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        );
    }
}
