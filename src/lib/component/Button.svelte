<!--
VARIANTS (to convince tailwind that the classes should be there, even tho they arent directly in the actual code)

variant-filled-primary
variant-filled-secondary
variant-filled-tertiary
variant-filled-success
variant-filled-warning
variant-filled-error
variant-filled-surface
variant-soft-primary
variant-soft-secondary
variant-soft-tertiary
variant-soft-success
variant-soft-warning
variant-soft-error
variant-soft-surface
variant-ringed-primary
variant-ringed-secondary
variant-ringed-tertiary
variant-ringed-success
variant-ringed-warning
variant-ringed-error
variant-ringed-surface
variant-ghost-primary
variant-ghost-secondary
variant-ghost-tertiary
variant-ghost-success
variant-ghost-warning
variant-ghost-error
variant-ghost-surface
variant-glass-primary
variant-glass-secondary
variant-glass-tertiary
variant-glass-success
variant-glass-warning
variant-glass-error
variant-glass-surface
-->

<script lang=ts>
    export let style: "filled" | "soft" | "ringed"  | "ghost" | "glass" = "filled";
    export let color: "primary" | "secondary" | "tertiary" | "success" | "warning" | "error" | "surface" = "primary";
    export let icon: boolean = false
</script>

<button class:btn={!icon} class:btn-icon={icon} class="variant-{style}-{color}"><slot /></button>