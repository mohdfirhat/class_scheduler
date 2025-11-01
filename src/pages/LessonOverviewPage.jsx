import NavBar from "../components/NavBar/NavBar";
import LessonTable from "../components/Tables/LessonTable";
import LessonPageBreadcrumbs from "../components/LessonPageBreadcrumbs";

const LessonOverviewPage = () => {
  return (
    <>
      <NavBar />
      <LessonPageBreadcrumbs />
      <h1>Lesson Overview</h1>
      <LessonTable />
    </>
  );
};
export default LessonOverviewPage;
