import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Comment from "./comment";

function useStory(id) {
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(setResponse);
  }, [id]);

  return response;
}

export function Story() {
  const { id } = useParams();
  const story = useStory(id);

  if (!story) {
    return (
      <div>
        <CircularProgress size={50} />
      </div>
    );
  }

  console.log(story);

  return (
    <div style={{ margin: "50px" }}>
      <a href={story.url}>Go to news site</a>

      <h2 style={{ color: "#353945" }}>{story.title}</h2>
      <div>
        <b>Date:</b> {new Date(story.time).toLocaleDateString()}
        <br />
        <b>Author:</b> {story.by}
        <br />
        <b>Comments:</b> {story.descendants}
        <br />
        <b>score:</b> {story.score}
        <br />
      </div>
      <div style={{ margin: "50px" }}>
        <h3 style={{ color: "#353966" }}>Comments:</h3>
        {story.kids?.map((id) => (
          <Comment
            key={id}
            id={id}
          />
        ))}
      </div>
    </div>
  );
}
