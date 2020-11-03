export const toServer = (comment) => {
  const {rating, text} = comment;

  return {
    'comment': text,
    'rating': rating,
  };
};

export const toClient = (comment) => {
  const {comment: text, date, id, rating, user} = comment;
  const {avatar_url: avatar, is_pro: pro, name} = user;

  return {
    id: String(id),
    avatar,
    author: name,
    rating,
    date: new Date(date),
    text,
    super: pro
  };
};

export default {toServer, toClient};
