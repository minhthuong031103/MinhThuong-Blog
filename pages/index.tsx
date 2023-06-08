import BlogPreview from '@/components/BlogPreview';
import { getBlogs } from '@/server/blogs';
import { BlogProps } from '@/types/blog_type';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

const Home: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    //w0screen h-screen bao trum het
    <main
      className="w-screen h-screen overflow-auto 
    flex flex-col items-center font-roboto
    bg-zinc-800 
    text-neutral-200"
    >
      <title>Home page</title>

      <section>
        <div className="mt-3 text-center ">
          <h1 className="text-[3rem]">Đây là blog web của minh thường</h1>
          <p>My blog is about my knowledge when studying projects</p>
        </div>
      </section>

      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12"> </div>
        {blogData?.map(function (blog: BlogProps) {
          return (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] 
              overflow-hidden mx-6 mb-6
               bg-neutral-300 text-zinc-800
                rounded-lg p-4
                 hover:bg-neutral-500 hover:text-neutral-300 
                 transition-all duration-300"
            >
              <a href={blog.url} target="_blank">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          );
        })}
      </section>
    </main>
  );
};
export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogProps[] = await getBlogs();

  return {
    props: { blogData: blogs },
  };
};
