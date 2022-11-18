import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useComment(id) {
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then(setResponse);
  }, []);
  return response;
}

function Comment({ id }) {
  const comment = useComment(id);
  console.log(comment);

  if (!comment) {
    return <div>Comments are Loading...</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: comment.text }} />
      <b>Date:</b> {new Date(comment.time).toLocaleString()}
      <br />
      <b>Author:</b> {comment.by}
    </div>
  );
}

export default Comment;
