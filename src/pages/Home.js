import { useEffect, useState } from "react";
import { Card, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";

function useNewStories() {
  const [response, setResponse] = useState(); //принимает на вход начальное состояние и возвращает массив из двух значений: текущего значения состояния и функции, которая обновляет состояние
  //в cosnt указали имена возвращаемых значений response, setResponse, которые хук useState будет инициализировать, обновлять и предоставлять доступ к их состоянию.

  useEffect(() => {
    //коллбэк отработает после первой отрисовки и последующих обновлений компонентов.
    //useEffecrt(()=>{}, []) - в хук вторым аргументом передается массив значений, которые надо отслеживать между отрисовками. Если хотя бы одно значение из этого массива поменялось, то колбек вызывается, если все значения остались прежними – пропускается.
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((response) => response.json())
      .then((ids) =>
        Promise.all(
          // возвращает промис, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента
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
  }, []); //Передали пустой массив, чтобы запустить useEffect() толькьо на момент первого рендера
  return response; //вернули полученные значения
}

export function Home() {
  // const stories = useNewStories(); //передали полученные значения
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
    ); //пока значения не получены, то выводим это значение
  }

  return (
    //перебираем полученные значения через массив и рендерим карточку со всеми данными в блок div

    <div>
      <div>
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
                <h2>{title}</h2>
                <p>
                  <b>{new Date(time).toLocaleDateString()}</b>,{time}
                  <br /> by {by}
                  <br />
                  (rating: {score}),
                  <br />
                  comments: {descendants},
                  <br />
                  kids: {kids}
                </p>
                <Button
                  color="primary"
                  component={Link}
                  to={`/story/${id}`}
                >
                  Go to story
                </Button>

                {/* тег линк не вызывает обновления страницы! */}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
