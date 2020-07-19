<script>
  import moment from "moment";
  export let list;
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li:last-of-type {
    margin-bottom: 0;
  }
  li * {
    vertical-align: middle;
  }
  time {
    display: block;
    font-size: 0.8em;
    color: #727272;
  }
</style>

<ul>
  {#each list as article (article.id)}
    <li>
      <a href="news/{article.slug}">{article.title}</a>
      <time datetime={article.published}>
        {moment(article.published).fromNow()}
      </time>
    </li>
  {/each}
</ul>
