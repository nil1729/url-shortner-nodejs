import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize';
import validURL from 'valid-url';

const InputURL = ({ sendURL }) => {
  useEffect(() => {
    M.AutoInit();
  });

  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  // handling Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validURL.isWebUri(input)) {
      sendURL({ error: 'Invalid URL', msg: 'Please Enter a Valid URL' });
    } else {
      // Call the Server with Long URL
      sendURL({ error: null, url: input });
      setInput('');
    }
  };

  return (
    <div className='row'>
      <form onSubmit={onSubmit}>
        <div className='col s12'>
          <h3 className='center'>URL Shortener [NodeJS Application]</h3>
          <div className='input-field'>
            <i className='material-icons prefix'>insert_link</i>
            <input required type='url' className='validate' value={input} onChange={onChange} />
            <label htmlFor='icon_prefix'>Enter URL here</label>
          </div>
          <div className='input-field center'>
            <button className='btn waves-effect waves-light' type='submit'>
              Shorten
              <i className='material-icons right'>content_cut</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

InputURL.propTypes = {
  sendURL: PropTypes.func.isRequired,
};

export default InputURL;
