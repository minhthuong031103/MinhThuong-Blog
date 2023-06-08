import Image from 'next/image';

interface BlogHeaderProps {
  createdAt: string;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}

const BlogHeader = function ({ createdAt, author }: BlogHeaderProps) {
  return (
    <div className="flex">
      <Image
        className="rounded-[50%] mb-4 mr-4 "
        width={50}
        height={50}
        alt="anh"
        src={author.avatar}
      />
      {createdAt}
    </div>
  );
};

export default BlogHeader;
