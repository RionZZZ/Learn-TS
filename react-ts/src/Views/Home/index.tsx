import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './home.css';
import { Button } from 'antd';
import axios from 'axios';

interface State {
  isLogin: boolean
  loaded: boolean
}

class Home extends Component<{}, State> {
  // constructor(props: {}) {
  //   super(props);
  //   this.state = {
  //     isLogin: true
  //   }
  // }
  state = {
    isLogin: true,
    loaded: false
  }

  componentDidMount(): void {
    axios.get('api/isLogin').then(res => {
      if (res.data.data) {
        console.log('已登录');
        this.setState({ loaded: true })
      } else {
        console.log('未登录');
        this.setState({ isLogin: false, loaded: true })
      }

    })
  }

  handleLogout = () => {
    axios.get('api/logout').then(res => {
      if (res.data.data) {
        this.setState({ isLogin: false })
      } else {
        console.log('退出登录失败');
      }

    })
  }

  handleCrawler = () => {
    axios.get('api/getData').then(res => {
      if (res.data?.data) {
        console.log('爬取成功');
      } else {
        console.log('爬取失败');
      }

    })
  }


  render(): React.ReactNode {
    if (this.state.isLogin) {
      if (this.state.loaded) {
        return (
          <div className="home-page">
            <Button onClick={this.handleCrawler}>Crawler</Button>
            <Button>show</Button>
            <Button onClick={this.handleLogout}>logout</Button>
          </div>
        );
      }
      return null;
    } else {
      return <Navigate replace to="/login" />
    }

  }
}

// const Home: React.FC = () => {
//   return (
//     <div className="home-page">
//       <Button>Crawler</Button>
//       <Button>show</Button>
//       <Button>logout</Button>
//     </div>
//   );
// }

export default Home;
