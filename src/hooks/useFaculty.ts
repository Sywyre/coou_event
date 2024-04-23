import { univastClient } from "@/services/api-client";
import { useEffect, useState } from "react";

export interface Faculty {
  id: string;
  name: string;
}

export interface FacultyResponse {
  data: Faculty[];
}

const useFaculty = () => {
  const [faculties, setFalculties] = useState<Faculty[]>();
  useEffect(() => {
    univastClient
      .get<FacultyResponse>(
        "/academia/faculties/169730df-c717-487d-bf55-420c33eee41d"
      )
      .then((res) => setFalculties(res.data.data));
  }, []);

  return { faculties };
};

export default useFaculty;
