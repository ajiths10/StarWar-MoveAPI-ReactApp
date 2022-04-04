import React, { useCallback, useState } from 'react';
import './Form.css';

const Form = (props) => {

    const [newTitle, setTitle] = useState('');
    const [newopText , setOpText] = useState('');
    const [newDate, setDate] = useState('');

    

    const titlehandler = (event) =>{
        setTitle(event.target.value.toString())
    }

    const opTexthandler = (event) =>{
        setOpText(event.target.value.toString())
    }

    const datehandler = (event) =>{
        setDate(event.target.value.toString())
    }

    const dataHandler = (event) =>{
        event.preventDefault();
        const newobj = {
            title: newTitle,
            openingText: newopText,
            releaseDate: newDate
        }
        console.log('submit');

        props.onClick(newobj);
    }

  return (
    <form >
      <div>
        <label>Title</label>
      </div>
      <div>
        <input type="text" onChange={titlehandler} />
      </div>
      <div>
        <label>Opening Text</label>
      </div>
      <div>
        <input type="text" className='BigTextArea' onChange={opTexthandler} />
      </div>
      <div>
        <label>Release Date</label>
      </div>
      <div>
        <input type="text" onChange={datehandler } />
      </div>
      <div>
        <button className='BTN' onClick={dataHandler} > Add Movie </button>
      </div>
    </form>
  );
};

export default React.memo(Form);
