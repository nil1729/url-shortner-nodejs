import React, {useState, useEffect} from 'react'
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';


import Spinner from './components/Spinner';
import InputURL from './components/InputURL';
import Result from './components/Result';
import Credit from './components/Credit';

const App = () => {

  // Autoinit All JS components
  useEffect(()=> {
    M.AutoInit();
  });

  // Input Initialization
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');


  // Notification
  const notify = (msg) => {
    M.toast({html: msg});
  };
  
  // Call the URL shortening API
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    // There have Some issues when I was building this on Development Mode, on send request via PROXY so it's better to use axios baseURL
    //baseURL: 'http://localhost:5000' // In production Don't need to add this.
  };

  // Call APIs
  const shortenURL = async (url) => {
    const body = {
      longURL: url
    };
    try {
      setLoading(true);
      const res = await axios.post('/api/v2/shorten', body, config);
      setResult(res.data.shortURL);
      setLoading(false);
    } catch (e) {
      console.log(e);
      M.toast({html: 'Sorry! Server Error occurred'});
    }
  };

  // handling Submit
  const handleInput = (e) => {
    const {error, url, msg} = e;
    if(error){
      setResult('');
      return notify(msg);
    }
    shortenURL(url);
  };

  return (
    <div className="container">
      <InputURL sendURL={handleInput}/>
      <div className="row center">
        {
          loading ? <Spinner/> : <Result result={result} notify={notify}/>
        }
      </div>
      <Credit name={'Nilanjan Deb (nil1729)'}/>
    </div>
  );
}

export default App;
