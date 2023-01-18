import './App.css';
import { useState } from 'react';
import { async } from 'q';

async function getMemes() {
  const newSite = [];
  const site = await fetch('https://api.memegen.link/templates/').then(
    (response) => response.json(),
  );
  site.map((i) => newSite.push(i.id));
  return newSite;
}

function GenerateImage(props) {
  if (!props.topTrue || !props.bottomTrue) {
    return (
      <img
        data-test-id="meme-image"
        src="https://api.memegen.link/images/ugandanknuck/Top_Text/Bottom_Text.png"
        alt="memes"
      />
    );
  }
  return (
    <img
      data-test-id="meme-image"
      src={`https://api.memegen.link/images/${props.templates}/${props.topTrue}/${props.bottomTrue}.png`}
      alt="memes"
    />
  );
}

export default function App() {
  const [inputBottom, setInputBottom] = useState('');
  const [inputTop, setInputTop] = useState('');
  const [inputTemplate, setInputTemplate] = useState('ugandanknuck');

  return (
    <div>
      <h1>The Grand Meme Generator</h1>
      <label>
        Top text
        <input
          value={inputTop}
          placeholder="Top Text"
          onChange={(event) => {
            setInputTop(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Bottom text
        <input
          value={inputBottom}
          placeholder="Bottom Text"
          onChange={(event) => {
            setInputBottom(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Meme template
        <input
          // value={inputTemplate}
          placeholder="Template"
          onChange={(event) => {
            setInputTemplate(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <button>Generate</button>
      <br />
      <br />
      <GenerateImage
        topTrue={inputTop}
        bottomTrue={inputBottom}
        templates={inputTemplate}
      />
    </div>
  );
}
