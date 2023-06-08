import { BlogProps } from '@/types/blog_type';
import BlogHeader from './BlogHeader';

const BlogPreview = function (props: BlogProps) {
  const { bodyText, title, createdAt, tags, author, lastEdited } = props;
  const previewText: string = bodyText.substring(0, 200) + '...';
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2 ">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, index) => {
          return (
            <p
              key={index}
              className="bg-[#EA906C] px-2 mt-2 font-semibold rounded-xl text-zinc-900"
            >
              {tag}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPreview;
