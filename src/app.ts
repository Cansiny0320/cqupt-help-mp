import { Component } from "react";
import "./app.scss";
import "./wdyr";

class App extends Component {
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
