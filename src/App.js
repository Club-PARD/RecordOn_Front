import "./App.css";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "./Style/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { Theme } from "./Style/Theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  const clientId = process.env.REACT_APP_CLIENT_ID;

  console.log(clientId);

  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
}

export default App;
