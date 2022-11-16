import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return <div>
  Story link: {story.url}
  <h2>{story.title}</h2>
  Date: {new Date(story.time).toLocaleDateString()}
  author: <b>{story.by}</b>
  Comments: {story.descendants}
  </div>
}



//           <Card>
//             <h2>{title}</h2>
//             <p>
//               , by {by} (rating:{' '}
//               {score})
//             </p>
//             <Link to={`/story/${id}`}>Go to story</Link>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }
