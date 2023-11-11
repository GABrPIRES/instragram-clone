import './App.css';
import { db, auth } from './firebase.js';
import { useEffect, useState } from 'react';
import Header from "./Header";
import Post from './Post'

function App() {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const unsubscribeAuth = auth.onAuthStateChanged(function (val) {
      if (isMounted) {
        setUser(val ? val.displayName : null);
      }
    });

    const unsubscribeSnapshot = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(function (snapshot) {
      if (isMounted) {
        setPosts(snapshot.docs.map(function (document) {
          return { id: document.id, info: document.data() }
        }));
      }
    });

    return () => {
      isMounted = false;
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>

      {posts.map(function (val) {
        return (
          <Post user={user} key={val.id} info={val.info} id={val.id} />
        );
      })}
    </div>
  );
}

export default App;

