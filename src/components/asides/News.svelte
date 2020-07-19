<script>
  export let news = [];
  import marked from "marked";
  import moment from "moment";
</script>

<style>
  time {
    float: right;
    font-size: 0.8em;
    color: #727272;
  }

  a {
    text-align: right;
    display: block;
  }
</style>

<h2>Latest News</h2>
<time datetime={news[0].published}>{moment(news[0].published).fromNow()}</time>
<h3>{news[0].title}</h3>
{@html marked(news[0].content ? news[0].content.substr(0, 200) : '')}
<a href="news/{news[0].slug}">Read More &gt;</a>
