import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const loginApi = (
  data: unknown
) =>
  axios.post(
    `${API}/login`,
    data
  );

export const registerApi = (
  data: unknown
) =>
  axios.post(
    `${API}/register`,
    data
  );

export const getStudentsApi = () =>
  axios.get(
    `${API}/students`
  );

export const updateStudentApi = (
  id: string,
  data: unknown
) =>
  axios.put(
    `${API}/student/${id}`,
    data
  );

export const deleteStudentApi = (
  id: string
) =>
  axios.delete(
    `${API}/student/${id}`
  );