import './App.css';
import { useState } from 'react';
import { saveAs } from 'file-saver';

// async function getMemes() {
//   const newSite = [];
//   const site = await fetch('https://api.memegen.link/templates/').then(
//     (response) => response.json(),
//   );
//   site.map((i) => newSite.push(i.id));
//   return newSite;
// }

// const memeNames = getMemes().id;

function NewGenerateImage({ templates, topTrue, bottomTrue }) {
  if (!templates) {
    templates = 'buzz';
    // templates = memeNames[Math.floor(Math.random() * memeNames.length)];
  }
  if (!topTrue) {
    topTrue = 'Generate';
  }
  if (!bottomTrue) {
    bottomTrue = 'Your Dreams';
  }
  return (
    <img
      data-test-id="meme-image"
      src={`https://api.memegen.link/images/${templates}/${topTrue}/${bottomTrue}.png`}
      alt="memes"
    />
  );
}

// const handleClick = () => {
//   const url = imgBuilder;
//   saveAs(url, 'Meme.txt');
// };

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
    }
    if (!newInputBottom) {
      newInputBottom = 'Your Dreams';
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
