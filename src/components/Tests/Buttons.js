import React,{Component} from 'react';
// import Button from 'antd';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';


import {connect} from 'dva';

import styles from './Buttons.less'

class Buttons extends Component{
  gutters = {};
  cloCounts = {};
  constructor(){
    super();
    this.state = {
      gutterKey: 1,
      colCountKey: 2,
      loading:false
    };
    [8, 16, 24, 32, 40, 48].forEach((value, i) => { this.gutters[i] = value; });
    [2,3,4,6,8,12].forEach((value,i) =>{this.cloCounts[i] = value;});
  }


  doLoading =() =>{

    this.setState({

        loading:true
      });
  };
  onGutterChange = (gutterKey) => {
    this.setState({ gutterKey : gutterKey });
  };
  onCloCountsChange = (colCountKey) => {
    this.setState({
      colCountKey : colCountKey
    });
  };
  render(){

    let {gutterKey,colCountKey,loading} = this.state;

    return (
      <div>

<Button type="primary" icon="shrink"  loading={loading} onClick={this.doLoading}>primary</Button>

        <ul  className={styles.luStyle}>
          <li>
            <Icon   type="fast-backward"></Icon>
          </li>
          <li>
            <Icon type="fast-forward"></Icon>
          </li>
        </ul>

        <div style={{ width: '50%' }}>
          <Slider
            min={0}
            max={Object.keys(this.gutters).length - 1}
            value={gutterKey}
            onChange={this.onGutterChange}
            marks={this.gutters}
            step={null}
          />
        </div>
        <div style={{ width: '50%' }}>
         <Slider
         min={0}
         max={Object.keys(this.cloCounts).length - 1}
         value = {colCountKey}
         onChange = {this.onCloCountsChange}
         marks={this.cloCounts}
         step = {null}
         />
        </div>
        <div  >

          <Row>
            <Col style ={{background:'#00A0E9'}} lg={{ span: (this.cloCounts[colCountKey]), offset: 2 }}>Col</Col>
            <Col style ={{background:'#00A0E9'}}  lg={{ span: (this.cloCounts[colCountKey]), offset: 2 }}>Col</Col>
            <Col style ={{background:'#00A0E9'}}   lg={{ span: (this.cloCounts[colCountKey]), offset: 2 }}>Col</Col>
          </Row>
        </div>
      </div>
    );
  }
}

Buttons.propTypes={};

export default connect()(Buttons);
