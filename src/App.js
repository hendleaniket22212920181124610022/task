



import React, { useState } from 'react';
import './styles.css'; // Import your CSS styles

function MovieFilter() {
  const [movies] = useState([
    { title: 'The Matrix', rating: 7, genre: 'Action' },
    { title: 'Focus', rating: 6, genre: 'Comedy' },
    { title: 'The Lazarus Effect', rating: 6, genre: 'Thriller' },
    { title: 'Everly', rating: 5.0, genre: 'Action' },
    { title: 'Maps to the Stars', rating: 7, genre: 'Drama' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptionsVisible, setCategoryOptionsVisible] = useState(false);
  const [ratingOptionsVisible, setRatingOptionsVisible] = useState(false); 

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const genre = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, genre]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== genre));
    }
  };

  const toggleCategoryOptions = () => {
    setCategoryOptionsVisible(!categoryOptionsVisible);
  };

  const toggleRatingOptions = () => { 
    setRatingOptionsVisible(!ratingOptionsVisible);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedRating === '' || parseFloat(selectedRating) === movie.rating) &&
    (selectedCategories.length === 0 || selectedCategories.includes(movie.category))
  );

  return (
    <div className="movie-filter-container">
      <div className="movie-filter">
        <input
          type="text"
          placeholder="Search..."
          className="search-field"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
         <div>
          <select
            value={selectedRating}
            onChange={handleRatingChange}
            className="search-field">
            <option value="a" disabled>
              Select Rating
            </option>
            <option value="">Rating</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <option key={rating} value={rating}>
                {Array(rating).fill("⭐").join("")}
              </option>
            ))}
          </select>
        </div>
        <div className="category-dropdown">
          <div className="category-header" onClick={toggleCategoryOptions}>
          <option value="">Genre</option>
          </div>
          {categoryOptionsVisible && (
            <div className="category-options">
              {['Action', 'Comedy', 'Drama', 'Thriller'].map(genre => (
                <label key={genre} className="category-option">
                  <input
                    type="checkbox"
                    value={genre}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      {searchQuery && (
        <div className="filtered-results">
        <ul>
        {filteredMovies.map((movie, index) => (
          <li key={index}>
            <div>
              <strong>Title:</strong> {movie.title}
            </div>
            <div>
              <strong>Rating:</strong> {movie.rating}
              {Array(Math.floor(movie.rating))
                .fill("⭐")
                .concat(movie.rating % 1 >= 0.5 ? "+1/2" : "")
                .join("")}
            </div>
            <div>
              <strong>Genre:</strong> {movie.genre}
            </div>
          </li>
        ))}
      </ul>
        </div>
      )}
    </div>
  );
}

export default MovieFilter;


