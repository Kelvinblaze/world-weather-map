import WorldMap from "./component/WorldMap";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div className="tw-h-screen tw-w-full  tw-border tw-relative">
      <WorldMap />
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default App;
