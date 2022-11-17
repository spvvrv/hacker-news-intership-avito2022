import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@material-ui/core";
import Button from "@mui/material/Button";

function useStory(id) {
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

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <a href={story.url}>Go to news site</a>
      <h2>{story.title}</h2>
      Date: {new Date(story.time).toLocaleDateString()}
      author: <b>{story.by}</b>
      Comments: {story.descendants}
    </div>
  );
}
