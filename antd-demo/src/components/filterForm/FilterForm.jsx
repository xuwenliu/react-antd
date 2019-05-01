import React from 'react';
import { Form, Select,Input,DatePicker,Checkbox,Button } from 'antd';
import utils from '../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
class FilterForm extends React.Component{
    state = {};

    search = () => {
        let data = this.props.filterList;
        let searchData = this.props.form.getFieldsValue();
        // isUnTimeStamp 默认不传返回的就是时间戳 传了true 就按照传递的format进行格式化。
        data.map((item) => {
            if (item.type === 'timeSelect') {
                let formatStr = item.format || 'YYYY-MM-DD';
                let start_time_field = item.startField || 'startTime';
                let end_time_field = item.endField || 'endTime';
                if (!item.isUnTimeStamp) {
                    searchData[start_time_field] = searchData[start_time_field]?moment(searchData[start_time_field]).unix():'';
                    searchData[end_time_field] = searchData[end_time_field]?moment(searchData[end_time_field]).unix():'';
                } else {
                    searchData[start_time_field] = searchData[start_time_field]?searchData[start_time_field].format(formatStr):'';
                    searchData[end_time_field] = searchData[end_time_field]?searchData[end_time_field].format(formatStr):'';
                }
            }
            if (item.type === 'timeSelectSingle') {
                let formatStr = item.format || 'YYYY-MM-DD';
                let start_time_field = item.startField || 'startTime';
                if (!item.isUnTimeStamp) {
                    searchData[start_time_field] = searchData[start_time_field]?moment(searchData[start_time_field]).unix():'';
                } else {
                    searchData[start_time_field] = searchData[start_time_field]?searchData[start_time_field].format(formatStr):'';
                }
                
            }
        })
        this.props.search(searchData);
    }

    getItems = () => {
        const { getFieldDecorator } = this.props.form;
        let data = this.props.filterList;
        let formItems = [];
        if (data && data.length > 0) {
            data.map(item => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let width = item.width || 120;
                let list = item.list || [];
                let key = item.key || '';
                let value = item.value || '';
                let placeholder = item.placeholder || '请选择';
                let showSearch = item.showSearch || false; //是否开启搜索
                let mode = item.mode && item.mode === 'm' ? "multiple" : '';//m多选 否则单选

                //input
                let allowClear = item.allowClear || false;//是否显示清除按钮
                let inputType = item.inputType || 'text';//类型

                //时间区间选择相关属性
                let showTime = item.showTime?item.showTime:true;//时间选择 是否显示选择时分秒
                let format = item.format || 'YYYY-MM-DD HH:mm:ss';

                let startField = item.startField || 'startTime';
                let endField = item.endField || 'endTime';

                let initialStartTime = item.initialStartTime || null;//开始时间 初始值
                let initialEndTime = item.initialEndTime || null;//结束时间 初始值
                
                let startPlaceholder = item.startPlaceholder || '开始时间';
                let endPlaceholder = item.endPlaceholder || '结束时间';

                let onChange = item.onChange || null;


                switch (item.type) {
                    case 'select':
                        let select = <FormItem key={field} label={label}>
                            {
                                getFieldDecorator([field], {
                                    initialValue:initialValue
                                })(
                                    <Select
                                        key={field}
                                        style={{ width }}
                                        placeholder={placeholder}
                                        showSearch={showSearch}
                                        mode={mode}
                                    >
                                        { utils.getOptions(list,key,value)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        formItems.push(select);
                        break;
                    case 'input':
                        let input = <FormItem key={field} label={label}>
                            {
                                getFieldDecorator([field], {
                                    initialValue:initialValue
                                })(
                                    <Input
                                        style={{ width }}
                                        type={inputType}
                                        placeholder={placeholder}
                                        allowClear={allowClear}
                                    />
                                )
                            }
                        </FormItem>
                        formItems.push(input);
                        break;
                    case 'timeSelect':
                        let startTime = <FormItem label={label} key={startField}>
                            {
                                getFieldDecorator([startField], {
                                    initialValue: initialStartTime,
                                })(
                                    <DatePicker
                                        style={{width}}
                                        showTime={showTime}
                                        placeholder={startPlaceholder}
                                        format={format} />
                                )
                            }
                        </FormItem>
                        formItems.push(startTime);

                        let endTime = <FormItem label="~" colon={false} key={endField}>
                            {
                                getFieldDecorator([endField], {
                                    initialValue: initialEndTime,
                                })(
                                    <DatePicker
                                        style={{ width }}
                                        showTime={showTime}
                                        placeholder={endPlaceholder}
                                        format={format} />
                                )
                            }
                        </FormItem>
                        formItems.push(endTime);
                        break;
                    case 'timeSelectSingle':
                        let startTimeSingle = '';
                        if (format === 'YYYY-MM') {
                            startTimeSingle= <FormItem label={label} key={startField}>
                            {
                                getFieldDecorator([startField], {
                                    initialValue: initialValue,
                                })(
                                    <MonthPicker
                                        style={{ width }}
                                        showTime={showTime}
                                        placeholder={placeholder}
                                        format={format}
                                        onChange={onChange}/>
                                )
                            }
                        </FormItem>;
                        } else {
                            startTimeSingle = <FormItem label={label} key={startField}>
                                {
                                    getFieldDecorator([startField], {
                                        initialValue: initialStartTime,
                                    })(
                                        <DatePicker
                                            style={{ width }}
                                            showTime={showTime}
                                            placeholder={placeholder}
                                            format={format} />
                                    )
                                }
                            </FormItem>;
                        }
                        
                        formItems.push(startTimeSingle);
                        break;
                    
                    case 'checkbox':
                    let checkbox = <FormItem key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue || false,
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItems.push(checkbox);
                        break;
                    
                }
            })
            return formItems;

        }
    }

    render() {
        return (
            <Form layout="inline">
                {this.getItems()}
                <FormItem>
                    <Button onClick={this.search} type="primary" icon="search" style={{ margin: '0 10px' }}>搜索</Button>
                    <Button onClick={()=>this.props.form.resetFields()}>重置</Button>
                 </FormItem>
            </Form>
        )
    }


}

export default Form.create({})(FilterForm);
