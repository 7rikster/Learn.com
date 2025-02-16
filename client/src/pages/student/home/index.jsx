import { courseCategories } from "@/config";
import banner from "../../../../public/Landing-page-img.webp";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

function StudentHomePage() {
  const { studentViewCourseList, setStudentViewCourseList } =
    useContext(StudentContext);

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleNavigateTocoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response.success) setStudentViewCourseList(response.data);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  async function handleCourseNavigate(currentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      currentCourseId,
      auth?.user?._id
    );
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${currentCourseId}`);
      } else {
        navigate(`/course/details/${currentCourseId}`);
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg-px-8">
        <div className="flex flex-col space-y-4 lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
          <h1 className="text-4xl mb-2 font-bold">Welcome to Learn.com</h1>
          <p className="text-xl md:text-[18px] mb-5">
            Start learning new skills and improve your knowledge with our wide
            range of courses.
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-lg "
            alt="banner"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4">
          {courseCategories.map((category, index) => (
            <Button
              variant="outline"
              className="justify-start"
              key={index}
              onClick={() => handleNavigateTocoursesPage(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {studentViewCourseList && studentViewCourseList.length > 0 ? (
            studentViewCourseList.map((course, index) => (
              <div
                className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
                key={index}
                onClick={() => handleCourseNavigate(course?._id)}
              >
                <img
                  src={course?.image}
                  width={300}
                  height={150}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{course?.title}</h3>
                  <p className="text-sm mb-2 text-gray-700">
                    {course?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">${course?.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>No courses available</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
