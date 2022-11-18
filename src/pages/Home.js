import { useEffect, useState } from "react";
import { Card, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";

function useNewStories() {
  const [response, setResponse] = useState();
  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((response) => response.json())
      .then((ids) =>
        Promise.all(
          ids
            .slice(0, 100)
            .map((id) =>
              fetch(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`
              ).then((response) => response.json())
            )
        )
      )
      .then(setResponse);
  }, []);
  return response;
}

export function Home() {
  const [stories, setStories] = useState();

  async function getStories(max) {
    const storiesResponse = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const storiesIds = await storiesResponse.json();
    const storiesPromises = storiesIds
      .slice(0, max)
      .map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (response) => response.json()
        )
      );
    const stories = await Promise.all(storiesPromises);
    setStories(stories);
  }

  useEffect(() => {
    getStories(100);
  }, []);

  useEffect(() => {
    if (stories) {
      setTimeout(() => {
        getStories(100);
      }, 60000);
    }
  }, [stories]);

  if (!stories) {
    return (
      <div>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ margin: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getStories(100);
          }}
        >
          Reload stories
        </Button>
      </div>

      <div>
        {stories.map(({ id, title, time, by, score, descendants, kids }) => {
          return (
            <div key={id}>
              <Card>
                <h2 style={{ color: "#353945" }}>{title}</h2>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "start",
                    color: "#353945",
                    fontSize: "18px",
                  }}
                >
                  Rating: {score}
                  <br />
                  Date of article: {new Date(time).toLocaleString()}
                  <br />
                  Article author: {by}
                  <br />
                  Comments: {descendants}
                  <br />
                </p>
                <Button
                  color="primary"
                  component={Link}
                  to={`/story/${id}`}
                >
                  Go to story
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
