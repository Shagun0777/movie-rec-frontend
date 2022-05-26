import "./App.css";
import Axios from "axios";
// import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import ExpandableList from "./components/ExpandableList";

import {useParams, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// "logged user": "",
// "watched": [],
// "recommended_movies": [],
// "status": "User does not exist visit http://localhost:8000/create_user/?user_id=raja",
// "register here": "http://localhost:8000/create_user/?user_id=raja"

const base_url = 'https://movie-recommend-shagun.herokuapp.com/'
const Login = ({ params }) => {
  let { id } = useParams();
  // console.log('id is',id, params)
  let [user, setUser] = useState('');
  let [watched, setWatched] = useState([]);
  let [state, setState] = useState('')
  let [register, setRegister] = useState('')
  let [exact_match, setExact] = useState([])
  let [recommend_by_name, setName] = useState([])
  let [recommend_by_genre, setGenre] = useState([])
  let [recommend_by_cast, setCast] = useState([])
  let [recommend_final, setFinal] = useState([])
  let [sort, setSort] = useState(0);
//   let [, setScraps] = useState([]);
  const [one, enable1] = useState(true);
  const [two, enable2] = useState(true);
  const [three, enable3] = useState(true);
  const [four, enable4] = useState(true);


  useEffect(() => {
    fetchMovies();
    // sortMovies();
  }, []);




  const fetchMovies = async () => {
    const response = await Axios(base_url+"login/?user_id=" +params);
    // console.log('response',response)
    var data = response.data

    var user_log = data['logged user']
    var watched_user = data['watched']
    fetchRecommended(data['recommended_movies'])
    // var ans = []
    // var curr = 0
    // for(var i in data){
    //   ans.push(data[i]['title']);
    // }
    // console.log(ans)
    // setScraps(ans);
    setWatched(watched_user)
    setUser(user_log)
    // console.log("length= "+scraps)
  };
  const fetchRecommended = async (data) => {
      if (data.length == 0 ){
        const response = await Axios(base_url+"create_user/?user_id=" +params)
        fetchMovies()
        return
      }
    // console.log('fdata',data)
    var exact_match_f = convert_react_child(data['exact match'],'title')
    // console.log(exact_match_f)
    setExact(exact_match_f)
    if( data['recommended_match']['By Name'] != null){
        setName(convert_react_child(data['recommended_match']['By Name'],'title'))
    }
    if( data['recommended_match']['By Genre'] != null){
    setGenre(convert_react_child(data['recommended_match']['By Genre'],'title'))
    }
    if( data['recommended_match']['By Cast'] != null){
    setCast(convert_react_child(data['recommended_match']['By Cast'],'title'))
    }
    if( data['recommended_match']['final_show_to_user'] != null){
    setFinal(convert_react_child(data['recommended_match']['final_show_to_user'],'title'))
    }
    // console.log("length= "+scraps)
  };
  const convert_react_child = (data, key) =>{
    var ans = []
    var curr = 0
    // console.log('ccccccccc', data)
    for(var i in data){
        // console.log('ccccccccc', data[i][key])
      ans.push([data[i][key],data[i]['release_date'],data[i]['homepage']]);
    }
    return ans
  }
  const [selected, setSelected] = React.useState("Newest First");
  const changeSelected = () => {
    console.log('selected=',selected)
    if (selected==1){
      setSelected(0)
    }
    else{
      setSelected(1)
    }

  };
  let options = null;
  const sort_array = ["Newest First", "Oldest First", "A to Z", "Z to A"];
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  options = sort_array.map((x) => <option key={x}>{x}</option>);

  if (selected === "Oldest First") sort = 1;
  else if (selected === "Newest First") sort = 2;
  else if (selected === "A to Z") sort = 3;
  else if (selected === "Z to A") sort = 4;
  const sortMovies = (k) => {
    
    console.log('sorting',k)
    if (sort == 1){
       return k.sort((a, b) => a[1].localeCompare(b[1]))
    }
    if(sort == 2){
      return k.sort((a, b) => b[1].localeCompare(a[1]))
    }
    if(sort == 3){
      k.sort()
      // return k
    }
    if(sort == 4){
      k.sort()
      k.reverse()
      // return k
    }
    console.log('a sorting',k)
    return k
  };
 
  return (

      <div >
        <h1 color="white">{("user logged :"+ (user)).toUpperCase()}</h1>
        <form style={{ marginBlock: 10 }}>
        <label>Sort By: </label>
        <select onChange={changeSelectOptionHandler}>{options}</select>
      </form>
      {user == '' && <h2>Loading...</h2>}
        <ExpandableList data={watched} header={"User WatchList"}/>


        {one && exact_match.length > 0  && <ExpandableList data={sortMovies(exact_match)} header={"Exact Movies"}/>}
        
        {recommend_by_name.length > 0 && <ExpandableList data={sortMovies(recommend_by_name)} header={"Recommended By Name"}/>}

        {recommend_final.length > 0 &&  <ExpandableList data={sortMovies(recommend_final)} header ={"Final Recommendation"}/>}

        {recommend_by_genre.length>0  && <ExpandableList data={sortMovies(recommend_by_genre)} header={"recommended By Genre"}/>}

        {recommend_by_cast.length > 0 && <ExpandableList data={sortMovies(recommend_by_cast)} header={ "Recommended By Cast"}/>}

      </div>
    
  );
}

export default Login;