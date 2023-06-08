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
  const createdDay: Date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return (
    <div className="flex">
      <Image
        className="rounded-[50%] mb-4 mr-4 "
        width={50}
        height={50}
        alt="anh"
        src={author.avatar}
      />
      <div className="flex flex-col ">
        <p className="font-semibold text-[1rem]">{author.name}</p>
        <div className="flex gap-4 ">
          <li className="list-none font-normal text-[0.85rem]">{author.url}</li>
          <li className="font-normal ml-2 text-[0.85rem]">
            {createdDay.toLocaleDateString('en-US', options)}
          </li>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
