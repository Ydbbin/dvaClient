// react
import React, { Component } from 'react'
// dva
import { connect } from 'dva'
// antd
// import {Table  ,Button ,Popconfirm   ,Pagination } from 'antd'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css';
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css';
import Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css';
import Pagination from 'antd/lib/pagination'
import 'antd/lib/pagination/style/css';
import UserModal from './UserModal'
import styles from './Users.css'

import { PAGE_SIZE_USERS } from '../../constants'

class Users extends Component {
  constructor(props) {
      super(props);
    this.state  = {
      pageSize : PAGE_SIZE_USERS
    }
  };
  createHandler = ({ values }) => {
    this.props.dispatch({
      type: 'users/create',
      payload: values
    })
  };
  editHandler = ({ id, values }) => {
    this.props.dispatch({
      type: 'users/patch',
      payload: { id, values }
    })
  };
  deleteHandler = ({ id }) => {
    this.props.dispatch({
      type: 'users/remove',
      payload: { id }
    })
  };
  showSizeChange = (page,pageSize) =>{
    this.setState({
      pageSize : pageSize
    });
    this.props.dispatch({ type: 'users/fetch', payload: { page:page, pageSize: pageSize} })
  };
  pageChangeHandler = page => {

    this.props.dispatch({ type: 'users/fetch', payload: { page:page,pageSize: this.state.pageSize} })
  };
  componentDidMount() {
    const { dispatch, list } = this.props;
    if (list.length <= 0) {
      dispatch({ type: 'users/fetch', payload: { page: 1} })
    }
  };
  render() {
    let pageSize = this.state.pageSize;
    const { list: dataSource, loading, total, page: current } = this.props;
    // const { list: dataSource, loading, total } = this.props
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text =>
          <a href="">
            {text}
          </a>
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Website',
        dataIndex: 'website'
      },
      {
        title: 'Username',
        dataIndex: 'username'
      },

      {
        title: 'Operation',
        key: 'operation',
        render: (text, record) =>
          <span className={styles.operation}>
                        <UserModal record={record} onOk={this.editHandler}>
                            <a>Edit</a>
                        </UserModal>
                        <Popconfirm
                          title="Confirm to delete?"
                          onConfirm={this.deleteHandler.bind(null, {
                            id: record.id
                          })}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
      }
    ];
    return (
      <div className={styles.normal}>
        <div>
          <div className={styles.create}>
            <UserModal record={{}} onOk={this.createHandler}>
              <Button type="primary">Create User</Button>
            </UserModal>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record.id}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={pageSize}
            onChange={this.pageChangeHandler}
            // 改变每页展示数量 start
            showSizeChanger
            pageSizeOptions={['1','2','3','4']}
            onShowSizeChange={this.showSizeChange}
            //end


          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // 得到modal中的state)
  // const { list, total, page } = {
  //     list: [],
  //     total: 0,
  //     page: 0
  //   };
 const { list, total, page } = state.users;
 console.log(1111);
 console.log(state);
  return {
    loading: state.loading.models.users,
    list,
    total: parseInt(total, 10),
    page
  }
}

export default connect(mapStateToProps)(Users)
