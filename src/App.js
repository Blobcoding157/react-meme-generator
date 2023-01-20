import './App.css';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

function NewGenerateImage({ templates, topTrue, bottomTrue }) {
  if (!templates) {
    templates = '';
  }
  if (!topTrue) {
    topTrue = '';
  } else {
    topTrue = topTrue
      .replace(/[ ]/g, '_')
      .replace(/[__]/g, '_')
      .replace(/[--]/g, '-')
      .replace(/[?]/g, '~q')
      .replace(/[&]/g, '~a')
      .replace(/[%]/g, '~p')
      .replace(/[%20]/g, '_')
      .replace(/[/]/g, '~s')
      .replace(/[#]/g, '~h')
      .replace(/[<]/g, '~l')
      .replace(/[>]/g, '~g')
      .replace(/["]/g, '')
      .replace(/[\\]/g, '~b');
  }

  if (!bottomTrue) {
    bottomTrue = '';
  } else {
    bottomTrue =
      '/' +
      bottomTrue
        .replace(/[__]/g, '_')
        .replace(/[ ]/g, '_')
        .replace(/[--]/g, '-')
        .replace(/[?]/g, '~q')
        .replace(/[&]/g, '~a')
        .replace(/[%]/g, '~p')
        .replace(/[/]/g, '~s')
        .replace(/[#]/g, '~h')
        .replace(/[<]/g, '~l')
        .replace(/[>]/g, '~g')
        .replace(/["]/g, '')
        .replace(/[\\]/g, '~b');
  }
  return (
    <img
      data-test-id="meme-image"
      className="image"
      src={`https://api.memegen.link/images/${templates}/${topTrue}${bottomTrue}.png`}
      alt="memes"
    />
  );
}

export default function App() {
  const [inputBottom, setInputBottom] = useState('');
  const [inputTop, setInputTop] = useState('');
  const [inputTemplate, setInputTemplate] = useState('buzz');
  const [templateData, setTemplateData] = useState([]);

  let newInputTemplate = inputTemplate;
  let newInputTop = inputTop;
  let newInputBottom = inputBottom;

  axios
    .get('https://api.memegen.link/templates')
    .then((response) => {
      setTemplateData(response.data);
    })
    .catch((error) => console.error(error));

  const handleClick = () => {
    if (!newInputTemplate) {
      newInputTemplate = '';
    }

    if (!newInputTop) {
      newInputTop = '';
    } else {
      newInputTop = newInputTop
        .replace(/[ ]/g, '_')
        .replace(/[__]/g, '_')
        .replace(/[--]/g, '-')
        .replace(/[?]/g, '~q')
        .replace(/[&]/g, '~a')
        .replace(/[%]/g, '~p')
        .replace(/[/]/g, '~s')
        .replace(/[#]/g, '~h')
        .replace(/[<]/g, '~l')
        .replace(/[>]/g, '~g')
        .replace(/["]/g, '')
        .replace(/[\\]/g, '~b');
    }
    if (!newInputBottom) {
      newInputBottom = '';
    } else {
      newInputBottom =
        '/' +
        newInputBottom
          .replace(/[ ]/g, '_')
          .replace(/[__]/g, '_')
          .replace(/[--]/g, '-')
          .replace(/[?]/g, '~q')
          .replace(/[&]/g, '~a')
          .replace(/[%]/g, '~p')
          .replace(/[/]/g, '~s')
          .replace(/[#]/g, '~h')
          .replace(/[<]/g, '~l')
          .replace(/[>]/g, '~g')
          .replace(/["]/g, '')
          .replace(/[\\]/g, '~b');
    }

    const url = `https://api.memegen.link/images/${newInputTemplate}/${newInputTop}${newInputBottom}.png`;
    saveAs(url, `Meme_${newInputTemplate}`);
  };

  return (
    <div className="container">
      <h1 className="header">The Grand Meme Generator</h1>
      <label>
        Top text
        <input
          placeholder="Top Text"
          onChange={(event) => {
            newInputTop = event.currentTarget.value;
          }}
        />
      </label>
      <br />
      <label>
        Bottom text
        <input
          placeholder="Bottom Text"
          onChange={(event) => {
            newInputBottom = event.currentTarget.value;
          }}
        />
      </label>
      <br />
      <label>
        Meme template
        <input
          placeholder="Template"
          onChange={(event) => {
            newInputTemplate = event.currentTarget.value;
          }}
        />
      </label>
      <br />
      <span>
        <button
          data-test-id="generate-meme"
          onClick={() => {
            setInputBottom(newInputBottom);
            setInputTop(newInputTop);
            setInputTemplate(newInputTemplate);
          }}
        >
          Generate
        </button>

        <button onClick={handleClick}>Download</button>
      </span>
      <br />

      <select
        value={newInputTemplate}
        onChange={(event) => {
          setInputTemplate(event.currentTarget.value);
          newInputTemplate = event.currentTarget.value;
        }}
      >
        {templateData.map((event) => (
          <option key={event.id} value={event.id}>
            {event.id}
          </option>
        ))}
      </select>

      <br />
      <NewGenerateImage
        topTrue={inputTop}
        bottomTrue={inputBottom}
        templates={inputTemplate}
      />
    </div>
  );
}
