import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { TvMinimalPlay } from "lucide-react";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials } = useContext(AuthContext);

  function handleLogOut() {
    resetCredentials();
    sessionStorage.clear();
  }

  if (location.pathname.includes("/course-progress")) return null;

  return (
    <div className=" w-full bg-white">
      <header className="flex flex-row justify-between items-center p-4 border-b sticky">
        <div className="flex items-center space-x-4">
          <Link to="/home">
            <span className="text-[14px] md:text-xl font-extrabold">
              LEARN.COM
            </span>
          </Link>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              className="text-[14px] md:text-[16px] font-medium"
              onClick={() => {
                location.pathname.includes("/courses")
                  ? null
                  : navigate("/courses");
              }}
            >
              Explore Courses
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-[14px] md:text-[16px] font-extrabold flex items-center"
            onClick={() => navigate("/student-courses")}
          >
            My Courses <TvMinimalPlay className="w-8 h-8 text-bold" />{" "}
          </Button>
          <Button
            className="text-[14px] md:text-[16px] font-medium"
            onClick={handleLogOut}
          >
            Sign Out
          </Button>
        </div>
      </header>
    </div>
  );
}

export default StudentViewCommonHeader;
