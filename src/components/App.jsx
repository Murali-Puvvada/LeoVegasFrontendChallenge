import React, { useState } from "react";
import games from "./data";
import Card from "./Card";
import { Box, Grid } from "@mui/material";

function App() {
  // Input Search Text
  const [searchInput, setsearchInput] = useState("");
  // Mobile Categories Expand
  const [isExpanded, setExpanded] = useState(false);

  // Function to handle category expand
  function handleExpand() {
    setExpanded(!isExpanded);
  }

  // Function to handle Change in search bar
  function handleChange(event) {
    const newValue = event.target.value;
    setsearchInput(newValue);
  }

  var flag = false;
  var newGames = [];
  if (flag === false) {
    newGames = games;
  } else {
    newGames = [];
  }

  // Adding games based on search
  if (searchInput.length > 0) {
    flag = true;
    newGames = games.filter((game) => {
      var searchOutput = game.gameName.match(new RegExp(searchInput, "i"));
      return searchOutput;
    });
  }

  // console.log(newGames);

  const menuItems = [
    "top games",
    "newest",
    "Daily Jackpots",
    "instant win",
    "favourites",
    "exciting games",
    "table games",
    "slots",
    "jackpots"
  ];

  const [buttonItem, setbuttonItem] = useState();

  function handleClick(event) {
    const newValue = event.target.value;
    setbuttonItem(newValue);
  }
  //Adding games based on Category button click
  var categoryNames = [];
  games.map((categoryItem, index) => {
    return categoryNames.push(categoryItem.categories);
  });
  // console.log(categoryNames);

  var buffer = null;
  var newCategory = [];
  games.forEach(function (item) {
    const buttonValue = item.categories.includes(buttonItem);
    if (buttonValue === true) {
      buffer = true;
      newCategory.push(item);
    }
  });

  // Rendering based on Search and Category
  if (menuItems.includes(buttonItem) && searchInput.length > 0) {
    newCategory = newCategory.filter((game) => {
      var sear = game.gameName.match(new RegExp(searchInput, "i"));
      return sear;
    });
  }

  // console.log(newCategory);

  var mapValue = null;
  if (buffer === true) {
    mapValue = newCategory;
  } else {
    mapValue = newGames;
  }

  // console.log(mapValue);

  return (
    <div>
      <h1 className="heading">Leo Vegas</h1>
      {/* Search Menu */}
      <div className="search">
        <input
          className="searchTerm"
          type="search"
          placeholder="Search for Games"
          onChange={handleChange}
          value={searchInput}
          name="search"
        />
        <button type="submit" className="searchButton">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
      {/* Category Buttons  */}
      <div className="category">
        <button onClick={handleExpand} className="btn btn-outline-dark ">
          Categories <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      </div>
      {isExpanded &&
        menuItems.map((item) => (
          <button
            type="button"
            class="btn btn-outline-dark"
            value={item}
            onClick={handleClick}
          >
            {item.toUpperCase()}
          </button>
        ))}
      {/* Material UI Grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {mapValue.map((gameItem, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Card
                id={index}
                key={index}
                gameThumbnail={gameItem.gameThumbnail}
                gameName={gameItem.gameName}
                gamePreviewUrl={gameItem.gamePreviewUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {(buffer = false)}
      {/* {mapValue.map((gameItem, index) => (
        <Card
          id={index}
          key={index}
          gameThumbnail={gameItem.gameThumbnail}
          gameName={gameItem.gameName}
          gamePreviewUrl={gameItem.gamePreviewUrl}
        />
      ))}
      ; */}
    </div>
  );
}

export default App;
