const logOriginalURL = (request, response, next) => {
  console.log("Original URL:", request.originalUrl);
  next();
};

module.exports = logOriginalURL;
