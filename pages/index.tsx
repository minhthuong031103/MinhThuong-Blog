import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Blogs } from './components/Blog';
import { BlogProps } from '@/types/blog_type';
import { getBlogs } from '@/server/blogs';
import { useMemo, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { ImageCover } from '@/imageCover';
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
  const filterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx));
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText));
    } else {
      setSelectedIdx([...selectedIdx, idx]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };
  const blog = filteredBlog;

  return (
    <>
      <div
        className="flex flex-row
         justify-center items-center flex-wrap
            mt-16 mb-8"
      >
        {tags.map((tag: string, idx: number) => {
          return (
            <div
              key={idx}
              className={`${
                !selectedIdx.includes(idx)
                  ? `flex justify-center items-center
              text-xs text-left text-gray line-height[1.5] xl:text-lg 
              px-2 py-1.5 rounded-md bg-[#ECE5C7] 
              text-black font-semibold 
              cursor-pointer transition-all duration-300 
              ease-in-out mx-2 hover:bg-secondary-color 
           hover:text-[#116A7B] transform hover:translate-y-[-15px] 
             md:px-4 md:py-2 md:rounded-lg`
                  : `flex justify-center items-center
            text-xs text-left text-gray line-height[1.5] xl:text-lg 
            px-2 py-1.5 rounded-md bg-[#EA906C] 
            text-black font-semibold 
            cursor-pointer transition-all duration-300 
            ease-in-out mx-2 hover:bg-secondary-color 
         hover:text-[#116A7B] 
           md:px-4 md:py-2 md:rounded-lg`
              }`}
              onClick={(e) => filterLabel(e.target, idx)}
            >
              {tag}
            </div>
          );
        })}
      </div>

      <section className={styles.blog}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
          {blog ? (
            blog.map(function (item) {
              const imageCover = ImageCover.find(
                (image) => image.id === item.id
              );
              const createdDay: Date = new Date(item.createdAt);
              const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              };
              return (
                <div className={styles.boxItems} key={item.id}>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    <div className="img">
                      <img src={imageCover?.cover || ''} alt="" />
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
    </>
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
