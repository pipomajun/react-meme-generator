// import './App.css';
// import { useState } from 'react';
// import FetchMemes from './MemeForm';

// function InputForm() {
//   const [topText, setTopText] = useState('');
//   const [bottomText, setBottomText] = useState('');
//   const [templates, setTemplates] = useState([]);
//   const handleSelection = (event) => {
//     setSelectedTemplate(event.target.value);
//   };
//   return (
//     <div className="choose-form">
//       <form>
//         <label>
//           Top text
//           <input
//             placeholder="Top text goes here..."
//             value={topText}
//             onChange={(event) => setTopText(event.currentTarget.value)}
//           />
//         </label>
//         <label>
//           Bottom text
//           <input
//             placeholder="Bottom text goes here..."
//             value={bottomText}
//             onChange={(event) => setBottomText(event.currentTarget.value)}
//           />
//         </label>
//         {/* <label>
//       Meme template
//       <input
//         placeholder="Enter a meme (e.g. doge)"
//         value={inputText.templateText}
//         onChange={handleChange}
//       />
//     </label> */}
//         <label>
//           Meme template
//           <select onChange={handleSelection}>
//             <option>Select a template for your meme</option>
//             {templates.map((template) => (
//               <option key={template.id} value={template.id}>
//                 {template.name}
//               </option>
//             ))}
//           </select>
//         </label>
//       </form>
//     </div>
//   );
// }

// export default InputForm;
