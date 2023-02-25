<script lang=ts>
  import '../theme.postcss';
  import '@skeletonlabs/skeleton/styles/all.css';
  import "../app.postcss";
  import { AppBar, AppShell, LightSwitch, storeLightSwitch } from '@skeletonlabs/skeleton';
  import Transition from '$lib/component/Transition.svelte';
  import Sidebar from '$lib/component/Sidebar.svelte';
  import Button from '$lib/component/Button.svelte';
  import Icon from '$lib/component/Icon.svelte';
  export let data: import('./$types').LayoutData;
</script>

<AppShell>
	<svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3" background="bg-primary-400-500-token" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead">(icon)</svelte:fragment>
      Skrift
      <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
    </AppBar>
  </svelte:fragment>
	<!-- Router Slot -->
  <Button color="surface" style="ringed" icon><Icon name="bars-3" /></Button>
  <Transition pathname={data.pathname}>
    <slot />
  </Transition>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>

<svelte:head>
  <meta name="viewport" content="width=device-width" />
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://skrift.xyz/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Skrift">
  <meta property="og:description" content="Your Social Diary">
  <meta property="og:image" content="/Skrift%20AD.png">
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta property="twitter:domain" content="skrift.xyz">
  <meta property="twitter:url" content="https://skrift.xyz/">
  <meta name="twitter:title" content="Skrift">
  <meta name="twitter:description" content="Your Social Diary">
  <meta name="twitter:image" content="/Skrift%20AD.png">
  <meta name="theme-color" content={$storeLightSwitch?"#3E8CCC":"#78afdb"} />
</svelte:head>