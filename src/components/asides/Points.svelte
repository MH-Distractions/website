<script>
  export let teams = [];
  teams.sort((a, b) => b.points - a.points);
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li * {
    vertical-align: middle;
  }

  li {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  li:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  .points {
    float: right;
    margin-top: 13px;
  }
</style>

<h2>Team Rankings</h2>
<ul>
  {#each teams as team (team.name.toLowerCase())}
    <li>
      <img src="team-{team.name.toLowerCase()}.png" alt={team.name} />
      <div class="points">{team.points}</div>
      {team.name}
    </li>
  {/each}
</ul>
