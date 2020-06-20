import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize';


const Result = ({result, notify}) => {

    const [shortURL, setShortURL] = useState('');
    const shortURLinput = useRef();
    
    useEffect(()=> {
        M.AutoInit();
        setShortURL(result);
        // eslint-disable-next-line
    }, [result]);

    // Click to Copy Function
    const copyToClipBoard = () => {
        const el = shortURLinput.current;
        el.select();
        document.execCommand('copy');
        notify('Copied to Clipboard');
    };

    if(shortURL === ''){
        return (<></>)
    }
  return (
    <>
    <div className="col s12 m8">
      <div className="input-field">
        <i className="material-icons prefix">share</i>
          <input
              id="short"
              ref={shortURLinput}
              placeholder="Short URL" 
              type="url"
              value={shortURL}
              readOnly
            />
            <label className="active" htmlFor="icon_prefix">Shortened URL</label>
        </div>
    </div>
    <div className="col s12 m4">
       <div className="input-field center">
          <button className="btn waves-effect waves-light" onClick={copyToClipBoard}>Copy to Clipboard
              <i className="material-icons right">content_copy</i>
          </button>
        </div>
    </div>
    </>
  )
}

Result.propTypes = {
    result: PropTypes.string.isRequired,
    notify: PropTypes.func.isRequired,
}

export default Result
