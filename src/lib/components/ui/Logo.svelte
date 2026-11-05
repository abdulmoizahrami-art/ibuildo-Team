<script>
  import logo from '$assets/brand/logo.svg';

  // "wordmark" = icon + name (header). "full" = also the slogan line (footer).
  // Size it from outside with the --logo-h CSS variable.
  let { variant = 'wordmark' } = $props();
</script>

<a class="logo {variant}" href="#top" aria-label="آی بیلدو / iBuildo">
  <img src={logo} alt="iBuildo" />
</a>

<style>
  .logo {
    display: block;
    height: var(--logo-h, 34px);
    width: calc(var(--logo-h, 34px) * var(--ratio));
    overflow: hidden; /* the wordmark variant crops the slogan line off the same image */
  }
  .wordmark {
    --ratio: 3.22; /* 1900 / 590 */
  }
  .full {
    --ratio: 2.79; /* 1900 / 680 */
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
