import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Blogs } from './components/Blog';
import { BlogProps } from '@/types/blog_type';
import { getBlogs } from '@/server/blogs';
import { useMemo, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';

import styles from './style.module.css';
const Blog = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Search for blog by category
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
  const filteredBlog: BlogProps[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogProps) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogData;
  }, [filterWord]);
  const blog = filteredBlog;

  return (
    <section className={styles.blog}>
      <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
        {blog ? (
          blog.map(function (item) {
            const createdDay: Date = new Date(item.createdAt);
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            };
            return (
              <div className={styles.boxItems} key={item.id}>
                <Link href={`/details/${item.id}`} className="link">
                  <div className="img">
                    <img
                      src="https://vnlit.com/wp-content/uploads/2023/01/sach-cho-nguoi-huong-noi-cover.png"
                      alt=""
                    />
                  </div>
                </Link>
                <div className="bg-slate-100 rounded-lg">
                  <div className="flex flex-row gap-1">
                    <AiOutlineTags className={styles.icon} />
                    {item.tags.map(function (tag, index) {
                      return (
                        <div key={index} className={styles.tag}>
                          <Link className="ml-[2px]" href="/">
                            #{tag}
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  <h3 className="text-2xl">{item.title}</h3>

                  <p>{item.bodyText.slice(0, 180)}...</p>
                  <div className={styles.date}>
                    <AiOutlineClockCircle className={styles.icon} />{' '}
                    <label htmlFor="">
                      {createdDay.toLocaleDateString('en-US', options)}
                    </label>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="box boxItems">
            <h1>Không có bài viết nào</h1>
          </div>
        )}
      </div>
    </section>
  );
};
export default Blog;
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogProps[] = await getBlogs();
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  console.log(tags);
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  };
};
