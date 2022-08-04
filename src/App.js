import "./styles.css";
import personalStore from "./store";
import { useEffect } from "react";
import Home from "./pages/Home";

export default function App() {
  const getPersonals = personalStore((state) => state.getPersonals);
  const personals = personalStore((state) => state.personals);
  const getDistricts = personalStore((state) => state.getDistricts);

  useEffect(() => {
    getPersonals();
    getDistricts();
  }, []);

  useEffect(() => {
    console.log(personals);
  }, [personals]);

  return (
    <>
      <Home />
    </>
  );
}
