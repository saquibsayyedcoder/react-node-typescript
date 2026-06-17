import type { Student } from "../types/student";
import { decryptData } from "../utils/crypto";
import { deleteStudentApi } from "../services/studentApi";
import { toast } from "react-toastify";

interface Props {
  students: Student[];
  fetchStudents: () => void;
  setEditStudent: (student: Student) => void;
}

// ✅ FIX: pre-decrypt outside JSX loop
const normalizeStudents = (students: Student[]) => {
  return students.map((s) => ({
    ...s,
    fullName: decryptData(s.fullName),
    email: decryptData(s.email),
    phone: decryptData(s.phone),
    dob: decryptData(s.dob),
    address: decryptData(s.address),
    course: decryptData(s.course),
  }));
};

const StudentList = ({ students, fetchStudents, setEditStudent }: Props) => {

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    try {
      await deleteStudentApi(id);
      toast.success("Deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const decryptedStudents = normalizeStudents(students);

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Students ({students.length})
      </h2>

      {decryptedStudents.length === 0 ? (
        <p>No Students Found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {decryptedStudents.map((student) => (
            <div key={student._id} className="border p-4 rounded">

              <h3 className="font-bold">
                {student.fullName}
              </h3>

              <p>{student.email}</p>
              <p>{student.phone}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => setEditStudent(student)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(student._id!)}
                  className="bg-red-500 px-3 py-1 text-white rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default StudentList;