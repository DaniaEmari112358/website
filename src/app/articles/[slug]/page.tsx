import data from "../data.json";

const getArticle = (slug: String) => {
  return data.filter((a) => a.slug === slug);
};

export default function page({ params }: { params: { slug: String } }) {
  const article = getArticle(params.slug)[0];
  return <div>{article.title}</div>;
}
