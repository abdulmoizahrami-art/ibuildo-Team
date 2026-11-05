<script>
  // A labelled input or textarea. Extra props (name, type, placeholder, autocomplete…) are passed through.
  let { label, value = $bindable(''), invalid = false, multiline = false, ...rest } = $props();
</script>

<label>
  <span>{label}</span>
  {#if multiline}
    <textarea bind:value class:invalid {...rest}></textarea>
  {:else}
    <input bind:value class:invalid {...rest} />
  {/if}
</label>

<style>
  label {
    display: block;
    font-size: 0.95rem;
    font-weight: 500;
  }
  span {
    display: block;
    margin-bottom: 8px;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 400;
    color: var(--text);
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 14px;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }
  textarea {
    min-height: 130px;
    resize: vertical;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgb(var(--accent-rgb) / 0.15);
  }
  .invalid {
    border-color: var(--danger);
  }
  ::placeholder {
    color: var(--muted);
    opacity: 0.85;
  }
</style>
