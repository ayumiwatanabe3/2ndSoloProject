import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!!!!!!!!!!!!!!!!!!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import "./App.css";

// const App = () => {
//   const { register, control, handleSubmit } = useForm({
//     mode: "onChange",
//   });

//   return (
//     <>
//       <DevTool control={control} placement="top-left" />

//       <form onSubmit={handleSubmit((d) => console.log(d))}>
//         <h1>React Hook Form DevTools</h1>

//         <label>Test</label>
//         <input name="test" ref={register} />

//         <input type="submit" />
//       </form>
//     </>
//   );
// };

// export default App;
