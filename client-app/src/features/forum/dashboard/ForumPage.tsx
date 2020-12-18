import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import { IForumpost } from '../../../app/models/forumpost';

// interface IProps {
//     forumposts1: any[]
// }
const ForumPage = () => {
  const [forumposts, setForumposts] = useState<IForumpost[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forumposts')
        .then((response) => {
            setForumposts(response.data)
            });
  },[])
  
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/forumposts').then((response) => {
//       forumposts = response.data;
//       console.log('forumposts', forumposts);
//     });
//   });
  return (
    <div>
      Forum goes here!
      {forumposts && (
        <List>
          {forumposts.map((f: IForumpost) => (
            <List.Item key={f.id}>{f.title} </List.Item>
          ))}
        </List>
      )}
    </div>
  );
};

export default ForumPage;
