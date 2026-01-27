import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEnrollments = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/enrollments`);
    const data = await res.json();
    setEnrollments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleDrop = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/enrollments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Drop failed");
      await loadEnrollments();
      alert("Enrollment dropped");
    } catch (e) {
      console.error(e);
      alert("Could not drop enrollment");
    }
  };

  if (loading) return <p>Loading enrollments...</p>;

  return (
    <div>
      <h2>Enrollments</h2>
      {enrollments.length === 0 && <p>No enrollments yet.</p>}
      <ul>
        {enrollments.map((e) => (
          <li key={e.id}>
            ID {e.id} – courseId: {e.courseId}, studentId: {e.studentId}{" "}
            <button onClick={() => handleDrop(e.id)}>Drop</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrollmentList;
