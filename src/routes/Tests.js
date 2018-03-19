import React,{Component} from 'react'
import { connect } from 'dva'
import styles from './Tests.less'

import Buttons from '../components/Tests/Buttons.js'
class Tests extends Component{
  render(){
    return (
      <div className={styles.normal}>
        <Buttons />
      </div>
    );
  }
}
Tests.propTypes={};


export default connect()(Tests);
