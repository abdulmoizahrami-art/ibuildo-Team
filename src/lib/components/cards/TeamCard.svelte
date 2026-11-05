<script>
  import { t } from '$lib/state/settings.svelte.js';

  let { member } = $props(); // { id, photo } from data/team.js

  const key = (field) => `team.members.${member.id}.${field}`;
</script>

<article class="card">
  <div class="head">
    <div class="info">
      <div class="initial" aria-hidden="true">{t(key('name')).charAt(0)}</div>
      <h3>{t(key('name'))}</h3>
      <div class="role">{t(key('role'))}</div>
    </div>
    <div class="photo">
      {#if member.photo}
        <img src={member.photo} alt={t(key('name'))} width="300" height="300" loading="lazy" />
      {/if}
    </div>
  </div>
  <p class="desc">{t(key('desc'))}</p>
</article>

<style>
  .card {
    padding: 22px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
  }
  .initial {
    width: 34px;
    height: 34px;
    margin-bottom: 12px;
    display: grid;
    place-items: center;
    border: 1.2px solid var(--accent);
    border-radius: 50%;
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 700;
  }
  .role {
    color: var(--accent);
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  .photo {
    width: 100px;
    height: 100px;
    flex: none;
    border: 2px solid var(--accent);
    border-radius: 50%;
    box-shadow: 0 0 18px rgb(var(--accent-rgb) / 0.25);
    overflow: hidden;
  }
  .photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .desc {
    margin-top: 16px;
  }
</style>
