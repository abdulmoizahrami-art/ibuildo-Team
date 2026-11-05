<script>
  let { title, lead } = $props();
</script>

<h2>{title}</h2>
<p class="lead">{lead}</p>

<style>
  .lead {
    color: var(--muted);
    max-width: 56ch;
    margin: 0 0 48px;
  }
</style>
