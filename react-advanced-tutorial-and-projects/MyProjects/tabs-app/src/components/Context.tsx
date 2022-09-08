import { useQuery } from "react-query";
import { getDevelopers } from "../api/tabApi";
import { useTabContext } from "../context/TabContext";
import { useEffect } from "react";
import DeveloperList from "./DeveloperList";
import Developer from "./Developer";
const Context = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "developers",
    getDevelopers
  );
  const { developers, setDevelopers, activeDeveloper, setActiveDeveloper } =
    useTabContext();
  

  useEffect(() => {
    if (isSuccess) {
      setDevelopers(data);
    }
  }, [isSuccess, data, setDevelopers]);

  const values={
    developers:data,
    isLoading,
    isSuccess
  }

  return (
    <>
      <main className="main">
        <section className="wrapper">
          <DeveloperList {...values} />
          <Developer isLoading={isLoading}/>
        </section>
      </main>
    </>
  );
};

export default Context;
