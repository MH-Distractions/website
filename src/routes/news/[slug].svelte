<script context="module">
  import query from "../../graphql/query";

  export async function preload({ params }) {
    return await query(
      this.fetch,
      `query news { article (slug: "${params.slug}") {title published content}
        list: news {
          id
          title
          published
          slug
        } }`
    );
  }
</script>

<script>
  import marked from "marked";
  import moment from "moment";
  import NewsList from "../../components/asides/NewsList.svelte";

  export let article;
  export let list;
</script>

<style>
  h1 {
    padding-bottom: 10px;
  }
  time {
    margin-top: 10px;
    display: block;
    font-size: 0.5em;
    color: #727272;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="main">
  <h1>
    {article.title}
    <time datetime={article.published}>
      Published: {moment(article.published).format('llll')}
    </time>
  </h1>

  <div class="content">
    {@html marked(article.content)}
  </div>

</div>

<div class="aside">
  <section id="news-list">
    <NewsList {list} />
  </section>
</div>
