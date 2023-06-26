import { getLabels } from "../api";
import { useEffect, useState } from "react";

export const useLabelsData = () => {
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const tasks = await getLabels();
        setLabelList(tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLabels();
  }, []);
  return [labelList, setLabelList];
};
