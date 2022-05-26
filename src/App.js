import "./App.css";
import Axios from "axios";
// import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import ExpandableList from "./components/ExpandableList";
import Login from "./login";
import Recommend from "./movierecommend";
import Home from "./Home";
// import { Routes, Route } from "react-router-dom"
import {useParams, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
{/* <Routes> */}
  // <Route exact path="/login" component={Login}/>
  {/* <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/> */}
{/* </Routes> */}
const base_url = 'https://movie-recommend-shagun.herokuapp.com/'

function App() {

  let all_movies_list = []
  const setScraps = async (d) => {
    all_movies_list = d
  };

  useEffect(() => {
    
  }, []);

  const fetchScraps = async () => {
    const response = await Axios("http://localhost:8000/");
    // console.log('response',response)
    var data = response.data['data']
    var ans = []
    var curr = 0
    for(var i in data){
      ans.push(data[i]['title']);
    }
    // console.log(ans)
    setScraps(ans);
    // console.log("length= "+scraps)
  };
  function LoginV1() {
    let { user_id } = useParams();
    // console.log(user_id)
    return <Login params={user_id}/>;
  }
  function RegisterAndLogin() {
    let { user_id, movie_name } = useParams();
    // console.log(user_id, movie_name)
    // console.log(user_id)
    // return <Login params={user_id}/>;
    const response =  Axios(base_url+"login?user_id="+user_id+"&add_movies="+movie_name);
    return <Login params={user_id}/>
  }
  function RecommendMovie() {
    let { movie_name } = useParams();
 
    return <Recommend params={movie_name}/>
  }
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path = '/login/:user_id/:movie_name'>
          <div className="show">
          <RegisterAndLogin/>
          </div>
          {/* console.log('path',path) */}
      </Route>
      <Route path = '/login/:user_id'>
          <div className="show">
          <LoginV1/>
          </div>
          {/* console.log('path',path) */}
      </Route>
      <Route path = '/recommend/:movie_name'>
          <div className="show">
          <RecommendMovie/>
          </div>
          {/* console.log('path',path) */}
      </Route>
        <Route path = '/'>
          <div className="show">
            <Home/>
          </div>
      </Route>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
