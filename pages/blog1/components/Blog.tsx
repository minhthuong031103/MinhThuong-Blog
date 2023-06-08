import React from 'react';
import Link from 'next/link';
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';

import './style.module.css';
import { BlogProps } from '@/types/blog_type';
export const Blogs = (blog: BlogProps[]) => {
  return (
    <>
      <section className="blog">
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
          {blog ? (
            blog.map((item) => (
              <div className="box boxItems" key={item.id}>
                <Link href={`/details/${item.id}`} className="link">
                  <div className="img">
                    <img src={item.cover} alt="" />
                  </div>
                </Link>
                <div className="details">
                  <div className="tag">
                    <AiOutlineTags className="icon" />
                    <Link href="/">#{item.tags[0]}</Link>
                  </div>

                  <h3 className="text-2xl">{item.title}</h3>

                  <p>{item.bodyText.slice(0, 180)}...</p>
                  <div className="date">
                    <AiOutlineClockCircle className="icon" />{' '}
                    <label htmlFor="">{item.createdAt}</label>
                    <AiOutlineComment className="icon" />{' '}
                    <label htmlFor="">27</label>
                    <AiOutlineShareAlt className="icon" />{' '}
                    <label htmlFor="">Chia sẻ</label>
                  </div>
                </div>
              </div>
            ))
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
