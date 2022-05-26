import "./App.css";
import Axios from "axios";
// import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import ExpandableList from "./components/ExpandableList";

const base_url = 'https://movie-recommend-shagun.herokuapp.com/'

const Home = () =>{

  let [all_movies_list, setScraps] = useState([])


  useEffect(() => {
    fetchScraps();
  }, []);

  const fetchScraps = async () => {
    const response = await Axios(base_url);
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


  
  return (
<div>
            {all_movies_list.length == 0 && <h2>Loading...</h2>}
            {all_movies_list.length>0 && (
              <ExpandableList
              
                data={all_movies_list}
              />
            )}

          </div>

  );
}

export default Home;
