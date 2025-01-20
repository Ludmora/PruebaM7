import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: [], 
  },
  mutations: {
    setCursos(state, cursos) {
      state.cursos = cursos;
    },
    ADD_CURSO(state, curso) {
      state.cursos.push(curso);
    },
    UPDATE_CURSO(state, cursoActualizado) {
      const index = state.cursos.findIndex((curso) => curso.id === cursoActualizado.id);
      if (index !== -1) {
        Vue.set(state.cursos, index, cursoActualizado);
      }
    },
    DELETE_CURSO(state, id) {
      state.cursos = state.cursos.filter((curso) => curso.id !== id);
    },
  },
  actions: {
    fetchCursos({ commit }) {
      fetch('/cursoscategoria.json') 
        .then((response) => response.json())
        .then((data) => {
          commit('setCursos', data); 
        })
        .catch((error) => {
          console.error('Error al cargar los cursos:', error);
        });
    },
    addCurso({ commit }, curso) {
      commit('ADD_CURSO', curso);
    },
    updateCurso({ commit }, curso) {
      commit('UPDATE_CURSO', curso);
    },
    deleteCurso({ commit }, id) {
      commit('DELETE_CURSO', id);
    },
  },
  getters: {
    getCursos(state) {
      return state.cursos;
    },
  },
});
