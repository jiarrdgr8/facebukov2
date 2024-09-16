import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const queryClient = new QueryClient();

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react"; //review ts-ignore
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import LoginPage from "scenes/loginPage";
// import "./App.css";
// import persistedStore from "./services/store"; // @ts-ignore
// import { AuthProvider } from "services/auth";
// const queryClient = new QueryClient();
// import { useMemo } from "react";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { themeSettings } from "./theme";
// import AuthRoute from "containers/Auth";

// export default function App() {
//   const { store, persistor } = persistedStore();
//   const theme = useMemo(() => createTheme(themeSettings("light")), ["light"]);

//   return (
//     <BrowserRouter>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <QueryClientProvider client={queryClient}>
//             <AuthProvider store={store}>
//               <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                 <Routes>
//                   <Route
//                     path="/"
//                     element={
//                       <AuthRoute>
//                         <LoginPage />
//                       </AuthRoute>
//                     }
//                   />

//                   {/* <Route
//               path="/home"
//               element={isAuth ? <HomePage /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/profile/:userId"
//               element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
//             /> */}
//                 </Routes>
//               </ThemeProvider>
//             </AuthProvider>
//           </QueryClientProvider>
//         </PersistGate>
//       </Provider>
//     </BrowserRouter>
//   );
// }
