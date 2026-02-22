import { client } from "../libs/microcms";
import TopPage from "../components/TopPage";

export default async function Home() {
  let news = [];
  let courses = [];
  let instructors = [];
  let active_classes = [];
  let past_classes = [];

  try {
    // 3つのAPIから並列でデータを取得
    const [newsData, coursesData, instructorsData,activeClassesData,pastClassesData] = await Promise.all([
      client.get({ endpoint: "news" }),
      client.get({ endpoint: "courses" }),
      client.get({ endpoint: "instructors" }),
      client.get({ endpoint: "active_classes", queries: { limit: 100 }}),
      client.get({ endpoint: "past_classes" , queries: { limit: 100 }}),
    ]);

    news = newsData.contents;
    courses = coursesData.contents;
    instructors = instructorsData.contents;
    active_classes = activeClassesData.contents;
    past_classes = pastClassesData.contents;

  } catch (e) {
    console.error("MicroCMS Error:", e);
  }

  return <TopPage news={news} courses={courses} instructors={instructors} activeClasses={active_classes} pastClasses={past_classes} />;
}
