import Link from "next/link";
import { GetStaticProps } from "next";
import ProjectCard from "@/components/ProjectCard";
import { fetchGraphQL } from "@/lib/api";
import Head from "next/head";

interface Project {
  title: string;
  slug: string;
  accentColor: string;
  workInProgress: boolean;
  desktopDemoImage: {
    filename: string;
    url: string;
    contentType;
  };
}
interface Props {
  projects: Project[];
}

function Projects({ projects }: Props) {
  return (
    <>
      <Head>
        <title>Krushil | Projects</title>
      </Head>
      <h1 className="text-center mb-8 text-4xl" style={{ fontFamily: "Rubik" }}>
        Projects
      </h1>
      <ul className="flex gap-9 flex-wrap max-w-[1550px] m-auto justify-center">
        {projects.map((project, i) => (
          <li
            className="bg-slate-700 hover:bg-slate-600 rounded-md transition-colors cursor-pointer"
            key={`project-${i}`}
          >
            <Link href={`/projects/${project.slug}`} passHref>
              <a>
                <ProjectCard {...project} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await fetchGraphQL(`
    query {
      projectCollection(preview: false, order: title_ASC) {
        items {
          title
          slug
          accentColor
          workInProgress
          desktopDemoImage {
            fileName
            url
            contentType
          }
        }
      }
    }
  `);

  return {
    props: {
      projects: data?.projectCollection?.items,
    },
  };
};

export default Projects;
