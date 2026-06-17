import StudentForm from "../components/StudentForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-4xl">
        <StudentForm
          fetchStudents={() => {}}
          editStudent={null}
          setEditStudent={() => {}}
        />
      </div>
    </div>
  );
};

export default Register;