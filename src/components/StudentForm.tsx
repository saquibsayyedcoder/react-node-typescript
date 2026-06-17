import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Student } from "../types/student";
import { registerApi, updateStudentApi } from "../services/studentApi";
import { encryptData, decryptData } from "../utils/crypto";
import { toast } from "react-toastify";

interface Props {
  fetchStudents: () => void;
  editStudent: Student | null;
  setEditStudent: (student: Student | null) => void;
}

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  address: "",
  course: "",
  password: "",
};

const StudentForm = ({ fetchStudents, editStudent, setEditStudent }: Props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  // ✅ FIX: depend only on stable identifier
  useEffect(() => {
  if (!editStudent?._id) return;
  setForm({
    fullName: decryptData(editStudent.fullName),
    email: decryptData(editStudent.email),
    phone: decryptData(editStudent.phone),
    dob: decryptData(editStudent.dob),
    gender: decryptData(editStudent.gender),
    address: decryptData(editStudent.address),
    course: decryptData(editStudent.course),
    password: decryptData(editStudent.password),
  });
}, [editStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const encryptedData = {
      fullName: encryptData(form.fullName),
      email: encryptData(form.email),
      phone: encryptData(form.phone),
      dob: encryptData(form.dob),
      gender: encryptData(form.gender),
      address: encryptData(form.address),
      course: encryptData(form.course),
      password: encryptData(form.password),
    };

    try {
      if (editStudent) {
        await updateStudentApi(editStudent._id!, encryptedData);

        toast.success("Student Updated Successfully");

        setEditStudent(null);
        setForm(initialState);
        fetchStudents();

        return;
      }

      await registerApi(encryptedData);

      toast.success("Student Registered Successfully");

      localStorage.setItem("isLoggedIn", "true");

      setForm(initialState);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl p-6 rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">
        {editStudent ? "Update Student" : "Student Registration"}
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border p-2 rounded" required />

        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="border p-2 rounded" required />
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded md:col-span-2" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />

        <div className="md:col-span-2 flex gap-3">
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Processing..." : editStudent ? "Update" : "Register"}
          </button>

          {editStudent && (
            <button
              type="button"
              onClick={() => {
                setEditStudent(null);
                setForm(initialState);
              }}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default StudentForm;