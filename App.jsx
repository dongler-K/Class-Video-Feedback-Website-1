
import { useState } from "react";

export default function FeedbackUploader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [lessonTopic, setLessonTopic] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback(null);
    setError(null);

    try {
      const res = await fetch("https://donghyunkim.app.n8n.cloud/webhook-test/19461011-7ab5-4e81-afd6-0f6aaa1f85eb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl,
          studentName,
          teacherName,
          lessonTopic,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      setError("Failed to fetch feedback. Please check the video URL and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Classroom Feedback Generator</h1>
      <input placeholder="Video URL (MP4)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      <input placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      <input placeholder="Teacher Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
      <input placeholder="Lesson Topic" value={lessonTopic} onChange={(e) => setLessonTopic(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Submit for Feedback"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {feedback && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h2>AI Feedback</h2>
          <p><strong>Student Feedback:</strong> {feedback.student}</p>
          <p><strong>Teacher Feedback:</strong> {feedback.teacher}</p>
        </div>
      )}
    </div>
  );
}
