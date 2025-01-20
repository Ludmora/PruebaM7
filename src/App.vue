<template>
  <v-app>

    <v-navigation-drawer app color="primary" dark v-model="drawer">
      <v-list>
        <v-list-item-group color="primary">

          <v-list-item to="/" exact>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>


          <v-list-item to="/administracion" exact>
            <v-list-item-content>
              <v-list-item-title>Administración</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar app color="primary" dark>

      <v-btn icon @click="drawer = !drawer" class="mr-2">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>


      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>


      <v-btn icon to="/administracion">
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>
    </v-app-bar>


    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
.v-navigation-drawer {
  width: 240px;
}

.v-btn {
  text-transform: none;
}
</style>
