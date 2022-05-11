import saveAs from 'file-saver';
import { useEffect, useState } from 'react';

function MemeForm() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState('');

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

  const handleSelection = (event) => {
    setSelectedTemplate(event.target.value);
  };
  const generateMeme = () => {
    setGeneratedMeme(
      `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}`,
    );
  };
  const downloadMeme = () => {
    saveAs(generatedMeme, `${topText}_${bottomText}_custom.jpg`);
  };
  return (
    <div>
      <div className="choose-form">
        <form>
          <label>
            Top text
            <input
              placeholder="Top text goes here..."
              value={topText}
              onChange={(event) => setTopText(event.currentTarget.value)}
            />
          </label>
          <label>
            Bottom text
            <input
              placeholder="Bottom text goes here..."
              value={bottomText}
              onChange={(event) => setBottomText(event.currentTarget.value)}
            />
          </label>
          {/* <label>
          Meme template
          <input
            placeholder="Enter a meme (e.g. doge)"
            value={inputText.templateText}
            onChange={handleChange}
          />
        </label> */}
          <label>
            Meme template
            <select onChange={handleSelection}>
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
