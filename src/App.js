import './App.css';
import { useState } from 'react';
import { saveAs } from 'file-saver';

function NewGenerateImage({ templates, topTrue, bottomTrue }) {
  if (!templates) {
    templates = 'buzz';
  }

  if (!topTrue) {
    topTrue = 'Generate';
  } else {
    topTrue = topTrue
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

  if (!bottomTrue) {
    bottomTrue = 'Your Dreams';
  } else {
    bottomTrue = bottomTrue
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
  return (
    <img
      data-test-id="meme-image"
      src={`https://api.memegen.link/images/${templates}/${topTrue}/${bottomTrue}.png`}
      alt="memes"
    />
  );
}

export default function App() {
  const [inputBottom, setInputBottom] = useState('');
  const [inputTop, setInputTop] = useState('');
  const [inputTemplate, setInputTemplate] = useState('');

  let newInputTemplate = inputTemplate;
  let newInputTop = inputTop;
  let newInputBottom = inputBottom;

  const handleClick = () => {
    if (!newInputTemplate) {
      newInputTemplate = 'buzz';
    }

    if (!newInputTop) {
      newInputTop = 'Generate';
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
      newInputBottom = 'Your Dreams';
    } else {
      newInputBottom = newInputBottom
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

    const url = `https://api.memegen.link/images/${newInputTemplate}/${newInputTop}/${newInputBottom}.png`;
    saveAs(url, `Meme_${newInputTemplate}`);
  };

  return (
    <div>
      <h1>The Grand Meme Generator</h1>
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
      <br />
      <br />
      <NewGenerateImage
        topTrue={inputTop}
        bottomTrue={inputBottom}
        templates={inputTemplate}
      />
    </div>
  );
}
