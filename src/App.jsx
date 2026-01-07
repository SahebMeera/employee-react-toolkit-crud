import React from "react";
import RecordTable from "./Components/RecordTable";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <RecordTable />
    </Provider>
  );
}
