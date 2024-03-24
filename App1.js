import logo from './logo.svg';
import './App.css';

const results= [
 
  {
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "created": "2024-03-07T07:07:15.111Z",
    "edited": "2024-03-07T07:07:15.111Z",
    "name": "Luke Skywalker",
    "homeworld": "https://www.swapi.tech/api/planets/1",
    "url": "https://www.swapi.tech/api/people/1"
  },
]

const data = [
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2016,
    "Year": "2016",
    "Population": 323127515,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2015,
    "Year": "2015",
    "Population": 321418821,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2014,
    "Year": "2014",
    "Population": 318857056,
    "Slug Nation": "united-states"
  },
  {
    "ID Nation": "01000US",
    "Nation": "United States",
    "ID Year": 2013,
    "Year": "2013",
    "Population": 316128839,
    "Slug Nation": "united-states"
  }
];

function App() {
return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    {results.map((result, index) => (
        <div key={index}>
          {Object.keys(result).map((key, index) => (
            <div key={index}>
              <strong>{key}:</strong> {result[key]}
            </div>
          ))}
        </div>
      ))}
       {data.map((item, index) => (
        <div key={index}>
          {Object.keys(item).map((key, index) => (
            <span key={index}><strong>{key}:</strong> {item[key]} </span>
          ))}
        </div>
      ))}
  </div>
);
}

export default App;
