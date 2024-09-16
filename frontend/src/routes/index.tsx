import React from "react";
import { Route, Routes } from "react-router-dom";
// import AuthRoute from "./AuthRoute"; // Ensure you have this component
import Login from "scenes/loginPage"; // Ensure you have this component

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default App;

// <Route
//   path="/register"
//   element={
//     <AuthRoute>
//       <Register />
//     </AuthRoute>
//   }
// />
// {/* <Route
//   path="/register/:type"
//   element={
//     <AuthRoute>
//       <Register />
//     </AuthRoute>
//   }
// /> */}
// <Route
//   path="/reset/:id"
//   element={
//     <AuthRoute>
//       <ResetPassword />
//     </AuthRoute>
//   }
// />
// <Route
//   path="/verify/:id"
//   element={
//     <AuthRoute>
//       <VerifyAccount />
//     </AuthRoute>
//   }
// />
// <Route
//   path={`/forgot-password`}
//   element={
//     <AuthRoute>
//       <ForgotPassword />
//     </AuthRoute>
//   }
// />
// <Route
//   path="/reset-password/:id"
//   element={
//     <AuthRoute>
//       <ResetPassword />
//     </AuthRoute>
//   }
// />

// <Route
//   path="/"
//   element={
//     <Internal>
//       {/* <Authorised action={actions.CAN_ACCESS_ACCOUNT}> */}
//       <Search />
//       {/* </Authorised> */}
//     </Internal>
//   }
// />

// <Route
//   path="/dashboard"
//   element={
//     <Internal>
//       <Search />
//     </Internal>
//   }
// />
// <Route
//   path="/test"
//   element={
//     <Internal>
//       <Test />
//     </Internal>
//   }
// />
// <Route
//   path="/search"
//   element={
//     <Internal>
//       <Search />
//     </Internal>
//   }
// />
// <Route
//   path="/results/:type"
//   element={
//     <Internal>
//       <Result />
//     </Internal>
//   }
// />
// <Route
//   path="/bookings"
//   element={
//     <Internal>
//       <Bookings />
//     </Internal>
//   }
// />
// <Route
//   path="/booking/success/:id"
//   element={
//     <Internal>
//       <BookingSuccess />
//     </Internal>
//   }
// />
// <Route
//   path="/explore"
//   element={
//     <Internal>
//       <Explore />
//     </Internal>
//   }
// />
// <Route
//   path="/motorhomes"
//   element={
//     <Internal>
//       <Motorhomes />
//     </Internal>
//   }
// />
// <Route
//   path="/locations"
//   element={
//     <Internal>
//       <Locations />
//     </Internal>
//   }
// />
// <Route
//   path="/space/host/:id"
//   element={
//     <Internal>
//       <HostSpace />
//     </Internal>
//   }
// />
// <Route
//   path="/space/:id"
//   element={
//     <Internal>
//       <CamperSpace />
//     </Internal>
//   }
// />
// <Route
//   path="/space/booking/:id"
//   element={
//     <Internal>
//       <BookingDetails />
//     </Internal>
//   }
// />

// <Route
//   path="/messages"
//   element={
//     <Internal>
//       <Messages />
//     </Internal>
//   }
// />
// <Route
//   path="/account"
//   element={
//     <Internal>
//       <Account />
//     </Internal>
//   }
// />
// <Route
//   path="/account/profile"
//   element={
//     <Internal>
//       <Profile />
//     </Internal>
//   }
// />
// <Route
//   path="/account/personal-information"
//   element={
//     <Internal>
//       <PersonalInformation />
//     </Internal>
//   }
// />
// <Route
//   path="/dashboard"
//   element={
//     <Internal>
//       <AsyncDashboard />
//     </Internal>
//   }
// />
// <Route
//   path="/location/:id"
//   element={
//     <Internal>
//       <Location />
//     </Internal>
//   }
// />
// <Route
//   path="/location/host/:id"
//   element={
//     <Internal>
//       <HostLocation />
//     </Internal>
//   }
// />
// <Route
//   path="/location/host/edit/:id"
//   element={
//     <Internal>
//       <EditLocation />
//     </Internal>
//   }
// />
// <Route
//   path="/location/host/add"
//   element={
//     <Internal>
//       <AddLocation />
//     </Internal>
//   }
// />
// <Route
//   path="/space/host/edit/:id"
//   element={
//     <Internal>
//       <EditSpace />
//     </Internal>
//   }
// />
// <Route
//   path="/space/host/add/:id"
//   element={
//     <Internal>
//       <AddSpace />
//     </Internal>
//   }
// />
// <Route
//   path="/motorhome/add"
//   element={
//     <Internal>
//       <AddMotorhome />
//     </Internal>
//   }
// />
// <Route
//   path="/motorhome/edit/:id"
//   element={
//     <Internal>
//       <EditMotorhome />
//     </Internal>
//   }
// />
// <Route
//   path="/booking/space/:id"
//   element={
//     <Internal>
//       <CamperBooking />
//     </Internal>
//   }
// />
// <Route
//   path="/message/:id"
//   element={
//     <Internal>
//       <Message />
//     </Internal>
//   }
// />

// <Route path="/*" element={<NotFound />} />
