import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const studentId = 1; // temporary fixed student id

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/courses`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch(`${API_BASE}/api/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: courseId,
          studentId: studentId,
        }),
      });

      if (!res.ok) {
        throw new Error("Enroll failed");
      }

      await loadCourses(); // refresh counts
      alert("Enrolled successfully!");
    } catch (err) {
      console.error(err);
      alert("Could not enroll. See console.");
    }
  };

  // ---------- CREATE NEW COURSE ----------

  const handleCreateCourse = async () => {
    if (!newName.trim()) {
      alert("Course name required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: newDescription,
          enrolledCount: 0,
        }),
      });

      if (!res.ok) {
        throw new Error("Create failed");
      }

      setNewName("");
      setNewDescription("");
      await loadCourses();
      alert("Course created");
    } catch (err) {
      console.error(err);
      alert("Could not create course");
    }
  };

  // ---------- EDIT HANDLERS ----------

  const startEdit = (course) => {
    setEditingCourse(course);
    setEditName(course.name);
    setEditDescription(course.description || "");
  };

  const cancelEdit = () => {
    setEditingCourse(null);
    setEditName("");
    setEditDescription("");
  };

  const saveEdit = async () => {
    if (!editingCourse) return;

    try {
      const res = await fetch(`${API_BASE}/api/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          enrolledCount: editingCourse.enrolledCount,
        }),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      await loadCourses();
      cancelEdit();
      alert("Course updated");
    } catch (err) {
      console.error(err);
      alert("Could not update course");
    }
  };

  // ---------- RENDER ----------

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Create New Course</h2>
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.25rem" }}>
          Name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "0.25rem" }}>
          Description:{" "}
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <button onClick={handleCreateCourse}>Add Course</button>
      </div>

      <h2>Available Courses</h2>
      {courses.length === 0 && <p>No courses found.</p>}

      <ul>
        {courses.map((c) => (
          <li key={c.id} style={{ marginBottom: "0.75rem" }}>
            {/* View mode */}
            {(!editingCourse || editingCourse.id !== c.id) && (
              <>
                – {c.name} (Enrolled: {c.enrolledCount ?? 0}){" "}
                <button onClick={() => handleEnroll(c.id)}>Enroll</button>{" "}
                <button onClick={() => startEdit(c)}>Edit</button>
              </>
            )}

            {/* Edit mode */}
            {editingCourse && editingCourse.id === c.id && (
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ marginBottom: "0.25rem" }}>
                  Name:{" "}
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "0.25rem" }}>
                  Description:{" "}
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
                <button onClick={saveEdit}>Save</button>{" "}
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
