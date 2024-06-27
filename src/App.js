import "./App.css";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./Style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./Style/theme";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
