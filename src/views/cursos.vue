<template>
  <v-container>
    <h1>Lista de Cursos</h1>


    <v-alert v-if="error" type="error" dismissible>
      {{ error }}
    </v-alert>

    <v-row v-if="cursos.length > 0">
      <v-col v-for="curso in cursos" :key="curso.id" cols="12" sm="6" md="4">
        <v-card class="curso-card">

          <v-img :src="curso.img" height="200px" contain class="curso-img"></v-img>

          <v-card-title>{{ curso.nombre }}</v-card-title>


          <v-card-subtitle>
            <v-row class="d-flex justify-center">

              <v-col v-for="(item, index) in getCursoDetalles(curso)" :key="index" cols="12"
                class="icon-description-container">
             
                <h3 class="titulo-campo">{{ item.titulo }}</h3>

          
                <div class="icon-description-wrapper">
              
                  <v-icon :style="{ color: item.color }" class="mr-2">{{ item.icon }}</v-icon>
                  <p class="description-text">{{ item.descripcion }}</p>
                </div>

           
                <div v-if="index < getCursoDetalles(curso).length - 1" class="divider-line-vertical"></div>
              </v-col>
            </v-row>
          </v-card-subtitle>


        </v-card>
      </v-col>
    </v-row>

    
    <v-alert v-if="cursos.length === 0 && !loading" type="warning" dismissible>
      No se han cargado cursos.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'Cursos-List',
  data() {
    return {
      error: null, 
      loading: true, 
    };
  },
  computed: {
    cursos() {
      return this.$store.getters.getCursos; 
    },
  },
  watch: {
   
    cursos(newCursos) {
      if (newCursos.length > 0) {
        this.loading = false; 
        this.error = null; 
      } else {
        this.loading = false; 
        this.error = 'No se han cargado cursos.';
      }
    },
  },
  created() {
    
    this.$store.dispatch('fetchCursos');
  },
  methods: {
   
    getCursoDetalles(curso) {
      return [
        {
          titulo: 'Duración', 
          icon: 'mdi-clock-time-four',
          descripcion: curso.duracion, 
          color: 'orange',
        },
        {
          titulo: 'Costo', 
          icon: 'mdi-currency-usd',
          descripcion: `${curso.costo} CLP`, 
          color: 'green',
        },
        {
          titulo: 'Cupos', 
          icon: 'mdi-seat',  
          descripcion: `${curso.cupos} cupos disponibles`, 
          color: 'blue',
        },
        {
          titulo: 'Descripción', 
          icon: 'mdi-information',
          descripcion: curso.descripcion, 
          color: 'purple',
        },
        {
          titulo: 'Fecha de Registro', 
          icon: 'mdi-calendar',
          descripcion: curso.fecha_registro, 
          color: 'blue',
        },
      ];
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.curso-img {
  object-fit: cover;  
  height: 200px;
 
}

.v-card-subtitle {
  font-size: 16px;
  color: #555;
}

.v-icon {
  font-size: 24px;
}

.v-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

p {
  margin-left: 10px;
 
}

.v-col {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.icon-description-wrapper {
  display: flex;
  align-items: center; 
  margin-bottom: 5px; 
}

.description-text {
  margin-left: 10px;
}

.divider-line-vertical {
  height: 30px; 
  width: 2px;
  background-color: #e0e0e0;
  margin-top: 5px;
  margin-bottom: 5px;
 }

.titulo-campo {
  font-weight: bold;
  margin-bottom: 3px;
  color: #333;
}


.curso-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
 }


.curso-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
</style>
