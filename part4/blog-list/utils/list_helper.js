const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let blog of blogs) {
    likes += blog.likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  });
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");
  const max = _.maxBy(Object.entries(authorCounts), ([, count]) => count);
  return { author: max[0], blogs: max[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
