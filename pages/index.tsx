import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import { fetchGraphQL } from "../lib/api";

interface Props {
  skills: string[];
}

const Home: NextPage<Props> = ({ skills }) => {
  return (
    <main className="text-center p-16">
      <section
        id="about"
        className="max-w-7xl m-auto flex flex-col md:flex-row-reverse md:justify-center md:h-screen items-center gap-7"
      >
        <Image
          src="/images/transparent_me.png"
          width={300}
          height={300}
          objectFit="cover"
          alt="selfie"
          objectPosition="50% 0%"
          className="rounded-md"
        />
        <div className="flex flex-col gap-9">
          <p className="max-w-lg text-2xl indent-4">
            I'm a hardworking and organized person, and I'm always willing to learn new
            skills.
            <br />
            <br />
            I work well both in a team environment as well as on my own, setting myself
            reasonable goals that improve my performance. I like to plan ahead so I can
            manage my time efficiently and make the most of every moment.
            <br />
            <br />
            I'm an animal lover and I admire those who take good care of them. I enjoy
            quiet environments thus they help me focus on my tasks. I like spicy foods and
            I'm a big fan of Mexican cuisine. I value an organized environment where I can
            work objectively and where hard work gets valued.
          </p>
          <div className="flex gap-4 items-center w-fit m-auto">
            <Link href="#contact">
              <a className="bg-rose-600 hover:bg-rose-500 m-auto p-2 rounded-md text-lg">
                Get in touch
              </a>
            </Link>
            <Link href="/projects" passHref>
              <a className="text-lg hover:text-rose-400 transition-colors">
                See my projects
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section id="skills">
        <Heading>Skills</Heading>
        <ul className="flex gap-3 flex-wrap justify-center">
          {skills.map((skill, i) => (
            <li
              key={`skill-${i}`}
              className="bg-slate-500/75 py-1 px-2 md:text-xl rounded-sm hover:bg-slate-500/95 transition-colors"
            >
              {skill}
            </li>
          ))}
          <li
            key="skill-more"
            className="bg-slate-500/75 py-1 px-2 md:text-xl rounded-sm hover:bg-slate-500/95 transition-colors"
          >
            ...and more!
          </li>
        </ul>
      </section>

      <section id="contact">
        <Heading>Contact</Heading>
        <form action="" className="flex flex-col gap-4 max-w-xl m-auto">
          {/* <input
            type="email"
            name="email"
            id="email"
            className="input"
            data-placeholder="Email:"
          /> */}
          <InputField element="input" type="email" placeholder="Email:" />
          <InputField element="textarea" type="text" placeholder="Message:" />

          <button
            type="submit"
            className="bg-rose-600 hover:bg-rose-500 w-fit m-auto p-2 rounded-md"
          >
            Get in touch
          </button>
        </form>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await fetchGraphQL(`
    query {
      techCollection(limit: 8) {
        items {
          label
        }
      }
    }
  `);

  return {
    props: {
      skills: data?.techCollection?.items?.map((item) => item.label) || [],
    },
  };
};

export default Home;
