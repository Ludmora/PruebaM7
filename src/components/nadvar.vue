<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/about">About</v-btn>
    <v-btn text to="/cursos">Cursos</v-btn>
    <v-btn text to="/administracion">Administración</v-btn> 
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
