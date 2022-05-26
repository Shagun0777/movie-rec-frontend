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


const Recommend = ({ params }) => {
  let { id } = useParams();
  console.log('id is',id, params)

  let [exact_match, setExact] = useState([])
  let [recommend_by_name, setName] = useState([])
  let [recommend_by_genre, setGenre] = useState([])
  let [recommend_by_cast, setCast] = useState([])
  let [recommend_final, setFinal] = useState([])
  let [sort, setSort] = useState(0);
//   let [, setScraps] = useState([]);


  useEffect(() => {
    fetchScraps();

  }, []);
  const base_url = 'https://movie-recommend-shagun.herokuapp.com/'
  const fetchScraps = async () => {
    const response = await Axios(base_url+"recommend_movie?movie=" + params);
    // console.log('response',response)
    var data = response.data
    console.log(data)
    fetchRecommended(data['data'])

  };
  const fetchRecommended = async (data) => {

    console.log('fdata',data['data'])
    for(var i in data){
        console.log(i)
    }
    // console.log('sdata', data['exact match'])
    var exact_match_f = [data['exact match']['title'], data['exact match']['release_date'], data['exact match']['homepage']]
    // console.log('edata',exact_match_f)
    setExact([exact_match_f])
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
      <form style={{ marginBlock: 10 }}>
        <label>Sort By: </label>
        <select onChange={changeSelectOptionHandler}>{options}</select>
      </form>
        {exact_match.length == 0 && <h2>Loading...</h2>}
        {exact_match.length > 0  && <ExpandableList data={sortMovies(exact_match)} header={"Exact Movies"}/>}
        
        {recommend_by_name.length > 0 && <ExpandableList data={sortMovies(recommend_by_name)} header={"Recommended By Name"}/>}

        {recommend_final.length > 0 &&  <ExpandableList data={sortMovies(recommend_final)} header ={"Final Recommendation"}/>}

        {recommend_by_genre.length>0  && <ExpandableList data={sortMovies(recommend_by_genre)} header={"recommended By Genre"}/>}

        {recommend_by_cast.length > 0 && <ExpandableList data={sortMovies(recommend_by_cast)} header={ "Recommended By Cast"}/>}

      </div>

  );
}

export default Recommend;