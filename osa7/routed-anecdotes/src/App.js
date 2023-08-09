import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { useField } from "./hooks";

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === "") {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>
};



const Anecdote = ({ anecdotes }) => {
  console.log(anecdotes)
  const id = useParams().id
  console.log("tämä on id:   " + id)
  const anecdote = anecdotes.find(a => a.id === Number(id))
  console.log(anecdote.id)
  return (
    <div>
      <h2>"{anecdote.content}"</h2>
      <div>Author: {anecdote.author}</div>
      <div>ID: {anecdote.id}</div>
      <div>Info: {anecdote.info}</div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("text")
  const reset = useField("button")

  const navigate = useNavigate()
 
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/") 
  }

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  //Koska oliolla name on nyt täsmälleen ne kentät, 
  // jotka input-komponentti odottaa saavansa propseina, 
  //voimme välittää propsit hyödyntäen spread-syntaksia ...content
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
          {...content}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            type={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {

  const padding = {
    paddingRight: 10,
  };
  const low = {
    padding: 30
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification("A new anecdote has been added!");
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Link to="/create" style={padding}>
            CreateNew!
          </Link>
          <Link to="/" style={padding}>
            Anecdotes!
          </Link>
          <About />
        </div>
        <div>
          <Routes>
            <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
            <Route path="/create" element={<CreateNew addNew={addNew} />} />
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          </Routes>
        </div>
      </Router>
      <div>
        <Notification message={notification} />
      </div>
      <div style={low}>
      <Footer  />
      </div>
    </>
  );
};

export default App;
