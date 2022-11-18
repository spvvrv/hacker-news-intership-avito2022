import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Comment from "./comment";
import second from 'react-router-dom'

function useStory(id) {
  // <Route path="/story/:id">
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(setResponse);
  }, [id]); //отслеживаем передаваемые id

  return response;
}

export function Story() {
  const { id } = useParams(); //возвращает объект пары key/value (ключ/значение) параметров URL
  const story = useStory(id);

  console.log(story);

  if (!story) {
    return (
      <div>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <div>
      <a href={story.url}>Visit news site</a>
      <h2>{story.title}</h2>
      <b>Date:</b> {new Date(story.time).toLocaleDateString()}
      <br />
      <b>Author:</b> {story.by}
      <br />
      <b>Comments:</b> {story.descendants}
      <br />
      <b>score:</b> {story.score}
      <br />
      <b>kids:</b> {story.kids}
      {story.kids?.map((id) => (
        <Comment
          key={id}
          id={id}
        />
      ))}
    </div>
  );
}
