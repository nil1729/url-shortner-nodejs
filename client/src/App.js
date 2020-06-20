import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize';
import validURL from 'valid-url';

const App = () => {
  // Autoinit All JS components
  useEffect(()=> {
    M.AutoInit();
  });
  // Input Initialization
  const [input, setInput] = useState('');


  // Handling Input
  const onChange = (e) => {
      setInput(e.target.value);
  };

  // handling Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if(!validURL.isWebUri(input)){
      M.toast({html: 'Please Enter a Valid URL'});
    }else{
      // Call the Server with Long URL
      console.log(input);
      setInput('');
    };
  };

  return (
    <>
      <div className="container">
          <div className="row">
              <form onSubmit={onSubmit}>
                <div className="col s12">
                  <h3 className="center">URL Shortener</h3>
                  <div className="input-field">
                    <i className="material-icons prefix">insert_link</i>
                    <input
                      required 
                      id="icon_prefix" 
                      type="url" 
                      className="validate"
                      value={input}
                      onChange={onChange}
                    />
                    <label htmlFor="icon_prefix">Enter URL here</label>
                  </div>
                  <div className="input-field center">
                      <button className="btn waves-effect waves-light" type="submit">Shorten
                          <i className="material-icons right">content_cut</i>
                      </button>
                  </div>
                </div>
              </form>
          </div>
      </div>
    </>
  );
}

App.propTypes = {

}

export default App
