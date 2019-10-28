import React, {Component} from 'react'
import Post from './Components/Post';
import {API} from './Apis'
class  App extends Component {
  state = {
    posts: [],
    err: false
  }
  componentDidMount() {
    this.getPosts()
  }
  componentDidCatch(error, info) {
    
    return <h1>Something went wrong... Please try again</h1> 
  }

  getPosts = () => {
    API.getPosts()
    .then(posts => posts.json())
    .then(posts => this.setState({posts, err: false}))
    .catch(err => this.setState({err: true}))
  }
  render() {
    const {err, posts} = this.state

    if(err) {
      return <div>Somthing went wrong. Please try again <button onClick={window.reload()}></button></div> 
    }

    return (
      <div className="app">
        <header>Posts</header>
        <div className="posts">
          {posts.length > 0 && posts.map(post => <Post key={post.id} msg={post} updatePosts={this.getPosts}/>)}
        </div>
      </div>
    );
  }
  
}

export default App;
