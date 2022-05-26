

const Movies = ({ list_movies }) => {
  let position = 0;
  console.log(list_movies)
  return (
    <div>
      {list_movies.map((movie) => (
        <div id="row">
          <div>
          {Array.isArray(movie) && <a href={movie[2]}>{movie[0]}</a>}
          {!Array.isArray(movie) && movie}
          </div>
          <div>
            {Array.isArray(movie) && movie[1]}
            </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
