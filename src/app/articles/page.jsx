
import Head from 'next/head'

import { Card } from '../components/Card'
import { SimpleLayout } from '../components/SimpleLayout'
import { formatDate } from '../lib/formatDate'

import {getArticleData} from '../lib/getArticleData'


function getArticleURL(blogHandle, publicationDomain, slug) {
  if (publicationDomain){
    return `https://${publicationDomain}/${slug}`
  }
  return `https://${blogHandle}.hashnode.dev/${slug}`
}

async function Article({ article, blogHandle, publicationDomain }) {
    return (
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <Card className="md:col-span-3">
          <Card.Title href={getArticleURL(blogHandle, publicationDomain, article.slug)}>
            {article.title}
          </Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={article.dateAdded}
            className="md:hidden"
            decorate
          >
            {formatDate(article.dateAdded)}
          </Card.Eyebrow>
          <Card.Description>{article.brief}</Card.Description>
          <Card.Cta>Read article</Card.Cta>
        </Card>
        <Card.Eyebrow
          as="time"
          dateTime={article.dateAdded}
          className="mt-1 hidden md:block"
        >
          {formatDate(article.dateAdded)}
        </Card.Eyebrow>
      </article>
    )
  }

export const revalidate = 3600

export default async function ArticlesIndex() {

    const data = await getArticleData();
    
    return (
      <>
        <Head>
          <title>Articles - Dania Emari</title>
          <meta
            name="description"
            content="All of my long-form thoughts on programming collected in chronological order."
          />
        </Head>
        <SimpleLayout
          title="Writing on my Hashnode blog."
          intro="All of my long-form thoughts on programming chronological order."
        >
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              {data.posts.map((article) => (
                <Article key={article.slug} article={article} blogHandle={data.blogHandle} publicationDomain={data.publicationDomain}/>
              ))}
              
            </div>
          </div>
        </SimpleLayout>
      </>
    )
  }
  