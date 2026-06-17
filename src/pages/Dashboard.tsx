import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import { getStudentsApi } from "../services/studentApi";
import type { Student } from "../types/student";

const Dashboard = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  // ✅ FIX: memoized function (prevents re-render loop)
  const fetchStudents = useCallback(async () => {
    try {
      const response = await getStudentsApi();
      setStudents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/", { replace: true });
      return;
    }

    fetchStudents();
  }, [navigate, fetchStudents]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl mb-6"
        >
          Logout
        </button>

        <StudentForm
          fetchStudents={fetchStudents}
          editStudent={editStudent}
          setEditStudent={setEditStudent}
        />

        <StudentList
          students={students}
          fetchStudents={fetchStudents}
          setEditStudent={setEditStudent}
        />

      </div>
    </div>
  );
};

export default Dashboard;