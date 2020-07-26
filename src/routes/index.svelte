<script context="module">
  import query from "../graphql/query";

  export async function preload() {
    return await query(
      this.fetch,
      `
      {
        teams {
          name
          points
        }
        news (limit: 1) {
          title
          published
          content
          slug
        }
        discord {
          id
          name
          status
          playing
          avatar_url
          avatar_url_jpg
        }
      }
    `
    );
  }
</script>

<script>
  import Points from "../components/asides/Points.svelte";
  import Discord from "../components/asides/Discord.svelte";
  import News from "../components/asides/News.svelte";

  export let teams;
  export let news;
  export let discord;
</script>

<style>
  img.logo {
    width: 100px;
    margin: 0 auto 20px;
    display: block;
  }

  #discord-widget {
    border: none;
    box-shadow: none;
    padding: 0;
  }
</style>

<svelte:head>
  <title>Welcome to MH Distractions</title>
  <meta
    name="description"
    content="MH Distractions is an online community that aims to provide a vital
    escape from the many stresses of life." />
</svelte:head>

<div class="main">
  <h1>Welcome to MH Distractions</h1>

  <section id="welcome-message">

    <p>
      Hi there! MH Distractions is an online community that aims to provide a
      vital escape from the many stresses of life. Mental health issues are
      becoming increasingly more common in today’s society, and sometimes
      getting together with people who understand what you’re going through and
      taking part in some activities can be helpful. There are also times where
      you just need to get something off your chest, and we have spaces for that
      as well, which will be available to everyone at all times.
    </p>

    <p>
      When you join our Discord Server, you will see one channel with a message
      listing our 4 teams. Simply click the reaction to choose which team you'd
      like to be a part of! Choose wisely, as you will not be given the
      opportunity to switch teams once you have made your choice. Each of our 4
      teams will be able to work together to earn points in our many activities.
      These points will accumulate over each month, and the team with the
      highest number of points at the end of the month will win a special
      reward! All the points will then reset, ready for the next month!
    </p>

    <p>
      We offer a wide selection of activities for all tastes! These will be held
      here on our website, our Discord, and in various games (including our very
      own Minecraft server!). All activities will be coordinated from Discord.
      We sincerely hope you will enjoy earning points with your team, making new
      friends, and taking part in fun activities with us! The staff team will
      always be working to improve our community - with Team Reps helping people
      to settle in, our Activity Team keeping the fun going, Moderation keeping
      our spaces safe, and Head Staff continually working on major updates.
      We're always here to listen to your questions, feedback, or anything else
      you'd like to say!
    </p>

    <p>Hope to see you around!</p>

    <img src="logos/mh-distractions.png" alt="MH Distractions" class="logo" />
  </section>
</div>

<div class="aside">
  <section id="team-list">
    <Points {teams} />
  </section>

  <section id="latest-news">
    <News {news} />
  </section>

  <section id="discord-widget">
    <Discord {discord} />
  </section>
</div>
