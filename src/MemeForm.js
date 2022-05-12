import saveAs from 'file-saver';
import { useEffect, useState } from 'react';

function MemeForm() {
  // Declare state variables
  // text input - tried inputText with topText and bottomText as object (?) did not work
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  // variables needed to fetch data
  const [templates, setTemplates] = useState([]);
  // variables needed to select a template
  const [selectedTemplate, setSelectedTemplate] = useState('');
  // variables needed to download the meme.img
  const [generatedMeme, setGeneratedMeme] = useState(
    `https://api.memegen.link/images/${
      selectedTemplate ? selectedTemplate : 'bender'
    }/${topText ? topText : '_'}/${bottomText ? bottomText : '_'}.png`,
  );
  // Fetch data from the API - not sure why try-catch worked
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const responseData = await response.json();
        setTemplates(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().catch(() => {});
  }, []);
  // function to handle template selection
  const handleSelection = (event) => {
    setSelectedTemplate(event.target.value);
  };
  // const handleKey = (event) => {
  //   if (event.keyCode === 13) {
  //     setSelectedTemplate(event.target.value);
  //   }
  // };
  // function to generate the meme for preview - if/else statement because url path would be incorrect without text
  const generateMeme = () => {
    setGeneratedMeme(
      `https://api.memegen.link/images/${
        selectedTemplate ? selectedTemplate : 'bender'
      }/${topText ? topText : '_'}/${bottomText ? bottomText : '_'}.png`,
    );
  };
  // function to download the meme
  const downloadMeme = () => {
    saveAs(generatedMeme, `custom_meme_${topText}_${bottomText}.jpg`);
  };
  // function to handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // where the fun stuff happens
  return (
    <div className="meme-form">
      <div className="input-form">
        <form onSubmit={handleSubmit}>
          <label>
            Top text
            <input
              placeholder="Top text goes here..."
              value={topText}
              onChange={(event) => setTopText(event.currentTarget.value)}
              // onKeyDown={(event) => {
              //   // make sure to generate meme after choosing in selector by pressing enter-key
              //   if (event.key === 'Enter') {
              //     event.preventDefault();
              //     generateMeme(event.target.value);
              //   }
              // }}
            />
          </label>
          <label>
            Bottom text
            <input
              placeholder="Bottom text goes here..."
              value={bottomText}
              onChange={(event) => setBottomText(event.currentTarget.value)}
              // onKeyDown={(event) => {
              //   // make sure to generate meme after choosing in selector by pressing enter-key
              //   if (event.key === 'Enter') {
              //     event.preventDefault();
              //     generateMeme(event.target.value);
              //   }
              // }}
            />
          </label>
          <label>
            Meme template
            <select
              value={selectedTemplate}
              onChange={handleSelection}
              onKeyDown={(event) => {
                // make sure to generate meme after choosing in selector by pressing enter-key
                if (event.key === 'Enter') {
                  event.preventDefault();
                  generateMeme(event.target.value);
                }
              }}
            >
              <option>Select a template for your meme</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
      <div className="button-generate">
        <button onClick={generateMeme}>Generate</button>
      </div>
      <div className="button-download">
        <button onClick={downloadMeme}>Download</button>
      </div>
      <div className="button-clear">
        <button onClick={() => setTopText('')(setBottomText(''))}>Clear</button>
      </div>
      <div className="preview-area">
        <h2>Preview your meme before saving:</h2>
        <img
          data-test-id="meme-image"
          src={generatedMeme}
          alt="Oops! You have not chosen anything yet or something did not work..."
        />
      </div>
    </div>
  );
}

export default MemeForm;
