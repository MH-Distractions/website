<script context="module">
  import query from "../../../graphql/query";

  export async function preload() {
    return await query(
      this.fetch,
      `query { news(publishedOnly: false) {_id title published status slug } }`
    );
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import moment from "moment";
  import AdminNav from "../../../components/asides/AdminNav.svelte";

  export let news;
</script>

<style>
  table {
    width: 100%;
  }

  td {
    text-align: left;
  }

  a {
    float: right;
    margin-bottom: 10px;
  }
</style>

<div class="main">
  <h1>News Admin</h1>

  <a href="admin/news/add">Add New Article</a>

  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Published Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#each news as article (article._id)}
        <tr on:click={() => goto(`admin/news/${article.slug}`)}>
          <td>{article.title}</td>
          <td>
            {article.published ? moment(article.published).format('lll') : ''}
          </td>
          <td>{article.status}</td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>

<div class="aside">
  <AdminNav />
</div>
