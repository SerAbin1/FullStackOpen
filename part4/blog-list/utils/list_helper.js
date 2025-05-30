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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
