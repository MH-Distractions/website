<script>
  import { user } from "../stores/user";
  export let segment;

  let pages = [
    { href: [undefined], name: "home" },
    { href: ["activities"], name: "activities" },
    { href: ["news"], name: "news" },
  ];
</script>

<style>
  nav {
    border-bottom: 1px solid #84ffff;
    font-weight: 300;
    padding: 1em 1em 0;
    background-color: #dfffff;
  }

  .layout {
    max-width: 1030px;
    width: 95%;
    display: block;
    margin: 0 auto;
    align-items: center;
  }

  ul {
    margin: 0;
    display: block;
    padding: 0;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  ul::-webkit-scrollbar {
    height: 1px;
  }
  ul::-webkit-scrollbar-track {
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
  }
  ul::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  li {
    display: inline-block;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(0, 62, 255);
    display: block;
    bottom: -1px;
  }

  ul li a {
    text-decoration: none;
    padding: 1.5em 1em 0.5em 0;
    display: block;
  }

  .logo {
    line-height: 1em;
  }
  img {
    height: 3.5em;
  }

  div.social {
    text-align: right;
    display: inline-block;
  }

  div.social a {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 0;
    margin-right: 20px;
  }

  div.social a.discord {
    width: auto;
  }

  div.social a img {
    max-width: 100%;
    height: auto;
    padding: 0;
    max-height: 100%;
  }

  .logos {
    display: grid;
    grid-template-columns: 75px auto;
  }
</style>

<nav>
  <div class="layout">

    <div class="logos">
      <a href="/" class="logo">
        <img src="logos/mh-distractions.png" alt="MH Distractions Logo" />
      </a>
      <div class="social">
        <a
          class="discord"
          href="https://discord.gg/zEHbNtV"
          target="_blank"
          rel="noopener">
          <img src="logos/discord@1.5x.png" alt="Discord Logo" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCare1yqXAgFtVtJqTIgqB4w"
          target="_blank"
          rel="noopener">
          <img src="logos/youtube.png" alt="YouTube Logo" />
        </a>
        <a
          href="https://twitter.com/MhDistractions"
          target="_blank"
          rel="noopener">
          <img src="logos/Twitter_Logo_Blue.png" alt="Twitter Logo" />
        </a>

        <a
          href="https://twitch.tv/mhdistractions"
          target="_blank"
          rel="noopener">
          <img src="logos/twitch.png" alt="Twitch Logo" />
        </a>

        <a
          href="https://www.facebook.com/MHDistractions"
          target="_blank"
          rel="noopener">
          <img src="logos/f_logo_RGB-Blue_100.png" alt="FaceBook Logo" />
        </a>
      </div>
    </div>
    <ul>
      {#each pages as { href, name }}
        <li>
          <a aria-current={href.includes(segment) ? 'page' : undefined} {href}>
            {name}
          </a>
        </li>
      {/each}
      {#if $user}
        <li>
          <a href="/" on:click|preventDefault={() => user.set(null)}>logout</a>
        </li>
      {:else}
        <li>
          <a
            aria-current={segment === 'login' ? 'page' : undefined}
            href="login">
            login
          </a>
        </li>
        <li>
          <a
            aria-current={segment === 'register' ? 'page' : undefined}
            href="register">
            register
          </a>
        </li>
      {/if}
    </ul>
  </div>
</nav>
