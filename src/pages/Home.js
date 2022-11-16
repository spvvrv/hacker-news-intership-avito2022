import { useEffect, useState } from 'react';
import { Card } from '@mui/material'; 
import { Link } from 'react-router-dom';

function useNewStories() {
  const [response, setResponse] = useState(); //принимает на вход начальное состояние и возвращает массив из двух значений: текущего значения состояния и функции, которая обновляет состояние
  //в cosnt указали имена возвращаемых значений response, setResponse, которые хук useState будет инициализировать, обновлять и предоставлять доступ к их состоянию. 

  useEffect(() => { //коллбэк отработает после первой отрисовки и последующих обновлений компонентов. 
    //useEffecrt(()=>{}, []) - в хук вторым аргументом передается массив значений, которые надо отслеживать между отрисовками. Если хотя бы одно значение из этого массива поменялось, то колбек вызывается, если все значения остались прежними – пропускается. 
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then((response) => response.json())
      .then((ids) =>
        Promise.all( // возвращает промис, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента
          ids.slice(0, 100).map((id) =>
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
  const newStories = useNewStories(); //передали полученные значения 

  if (!newStories) {
    return <div>Loading...</div>; //пока значения не получены, то выводим это значение 
  }

  return ( //перебираем полученные значения через массив и рендерим карточку со всеми данными в блок div
    <div>
      {newStories.map(({ id, title, time, by, score }) => {
        return (
          <Card>
            <h2>{title}</h2>
            <p>
              <b>{new Date(time).toLocaleDateString()}</b>, by {by} (rating:{' '}
              {score})
            </p>
            <Link to={`/story/${id}`}>Go to story</Link> 
            {/* тег линк не вызывает обновления страницы! */}
          </Card>
        );
      })}
    </div>
  );
}
