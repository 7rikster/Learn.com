import { Skeleton } from "@/components/ui/skeleton";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseDetailsService } from "@/services";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { id } = useParams();

  async function fetchStudentViewCourseDetails(courseId) {
    const response = await fetchStudentViewCourseDetailsService(courseId);
    if (response.success) {
      setStudentViewCourseDetails(response.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  useEffect(() => {
    if (currentCourseDetailsId !== null)
      fetchStudentViewCourseDetails(currentCourseDetailsId);
  });

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  if (loadingState) return <Skeleton />;

  return <div>StudentViewCourseDetailsPage</div>;
}

export default StudentViewCourseDetailsPage;
