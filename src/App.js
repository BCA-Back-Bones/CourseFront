import React from "react";
import CourseList from "./CourseList";
import EnrollmentList from "./EnrollmentList";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Course Enrollment</h1>
      <CourseList />
      <hr />
      <EnrollmentList />
    </div>
  );
}

export default App;
