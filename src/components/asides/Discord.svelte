<script>
  export let discord;
</script>

<style>
  .chat {
    color: #929292;
    width: 100%;
    height: 500px;
    overflow: hidden;
    background-color: #1c1c1c;
    border-radius: 5px;
  }
  .chat-header img {
    margin: 5px 2px -5px;
    width: 125px;
  }

  .chat-header {
    border-bottom: 1px solid #929292;
  }

  .chat-header .float-right {
    float: right;
    font-size: 0.75em;
    margin-top: 17px;
    margin-right: 10px;
    color: #929292;
  }

  .chat-list {
    height: 431px;
    overflow: auto;
    padding: 10px;
  }
  .chat-list::-webkit-scrollbar {
    width: 0.5em;
    border-radius: 1em;
  }

  .chat-list::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  }
  .chat-list::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 1em;
  }

  .chat-user img {
    border-radius: 8px;
    margin-right: 5px;
    width: 16px;
    height: 16px;
    display: inline-block;
  }

  .chat-status-indicator {
    position: relative;
    display: inline-block;
    height: 13px;
    width: 13px;
    background-color: #707070;
    border-radius: 50%;
    top: 5px;
    left: -13px;
    border: 2px solid #1c1c1c;
  }
  .chat-status-indicator[data-status="ONLINE"] {
    background-color: #277900;
  }
  .chat-status-indicator[data-status="DND"] {
    background-color: #792700;
  }
  .chat-status-indicator[data-status="AWAY"] {
    background-color: #797900;
  }

  .chat-user-name {
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #b7b7b7;
    font-size: 0.8em;
    display: inline-block;
  }

  .float-right {
    float: right;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #929292;
    white-space: nowrap;
    font-size: 0.8em;
  }
</style>

<div class="chat">
  <div class="chat-header">
    <a
      href="https://discord.gg/zEHbNtV"
      target="_blank"
      aria-label="Join our Discord Server"
      rel="noreferrer">
      <picture>
        <source srcSet="logos/discord@1.5x.webp" type="image/webp" />
        <img src="logos/discord@1.5x.png" alt="Discord logo" />
      </picture>
    </a>
    <div class="float-right">{discord.length} members online</div>
  </div>
  <div class="chat-list">
    {#each discord as user (user.id)}
      <div class="chat-user">
        <picture>
          <source
            srcSet={user.avatar_url || 'no-avatar.webp'}
            type="image/webp" />
          <img src={user.avatar_url_jpg || 'no-avatar.png'} alt={user.name} />
        </picture>
        <div class="chat-status-indicator" data-status={user.status} />
        <div class="chat-user-name">{user.name}</div>
        <div class="float-right">{user.playing || ''}</div>
      </div>
    {/each}
  </div>
</div>
