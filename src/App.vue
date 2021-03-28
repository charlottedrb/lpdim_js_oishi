<template>
  <div id="#app" style="width: 100vw">
    <!-- Nav bar -->
    <nav class="navbar menu justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left" href="oishi.derbagh.fr">Oishi</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/add"
              >Ajouter une recette</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Toutes les recettes</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <transition name="slide" mode="out-in">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
@import "./styles/theme.scss";

$duration: 0.8s;

.slide-enter-active,
.slide-leave-active {
  transition: opacity $duration, transform $duration;
}

.slide-enter,
.slider-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
