import { NuxtLink } from '../.nuxt/components';
<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-center shadow"
  >
    <div class="nav-brand">EXAT</div>
    <div class="collapse navbar-collapse">
      <ul class="d-flex gap-2 justify-content-center">
        <NuxtLink class="nav-link" to="/"> Home </NuxtLink>
        <NuxtLink class="nav-link" to="/register"> Register </NuxtLink>
        <NuxtLink class="nav-link" to="/datatable"> Data Table</NuxtLink>
      </ul>
    </div>
  </nav>
  <slot></slot>
</template>
