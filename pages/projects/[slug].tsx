import { GetServerSideProps } from "next";
import { motion, Variants } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import Link from "next/link";

interface Props {
  projectName: String;
}

const ProjectPage = (props: Props) => {
  const { projectName } = props;

  const variants: Variants = {
    open: {
      width: "125vw",
      height: "125vw",
      transition: {
        duration: 0.6,
      },
    },
    close: {
      width: 0,
      height: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen max-w-[100vw] overflow-hidden z-10">
        <motion.div
          variants={variants}
          initial="close"
          animate="open"
          exit="close"
          key="project-background"
          className="absolute -top-[40vw] left-1/2 -translate-x-1/2 origin-center z-10 rounded-full bg-red-900"
        ></motion.div>
      </div>

      <div className="relative z-20 md:p-9 flex flex-wrap justify-center gap-y-9 gap-x-48">
        <figure className="flex flex-col gap-6">
          <img
            src=""
            alt={`${projectName} screenshot`}
            className="bg-rose-600 rounded-md w-44 h-80 lg:w-[550px] lg:h-[300px]"
          />
          <figcaption className="text-center text-3xl md:text-4xl">
            {projectName}
          </figcaption>
        </figure>

        <div className="grid gap-9">
          <ul className="flex flex-wrap gap-2 my-2 mx-auto justify-center md:justify-start h-fit w-80">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li
                key={`tech-${i}`}
                className="bg-rose-300 border-rose-400 border-2 text-slate-600 font-bold rounded-full px-2 w-fit h-8"
              >
                {`Tech ${i + 1}`}
              </li>
            ))}
          </ul>
          <p className="max-w-md lg:max-w-2xl m-auto text-center md:text-left indent-8 text-lg md:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam amet
            quidem enim obcaecati, sit asperiores eos nulla similique minus. Quisquam,
            nam? Nesciunt a voluptas, sequi est modi non aspernatur quod?
          </p>
        </div>
      </div>

      <div
        className="font-mono flex gap-2 absolute bottom-4 left-3 z-50"
        key="bottom-nav"
      >
        <Link href="/projects" passHref>
          <a className="text-4xl bg-gray-50/5 hover:bg-gray-50/20 grid place-content-center rounded-full w-14 h-14">
            &larr;
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="bg-gray-50/5 hover:bg-gray-50/20 grid place-content-center rounded-full w-14 h-14">
            home
          </a>
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;

  return {
    props: {
      projectName: params?.slug ?? "random",
    },
  };
};

export default ProjectPage;
