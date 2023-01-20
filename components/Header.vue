import { NuxtLink } from '../.nuxt/components';
<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-5 shadow"
  >
    <div class="nav-brand">EXAT</div>
    <ul class="navbar-nav d-flex gap-3">
      <NuxtLink class="nav-link" to="/"> Home </NuxtLink>
      <NuxtLink class="nav-link" to="/register"> Register </NuxtLink>
      <NuxtLink class="nav-link" to="/datatable"> Data Table</NuxtLink>
    </ul>
  </nav>
  <slot></slot>
</template>
