<template>
    <v-container>
        <h1 class="text-center mb-4">Administración de Cursos</h1>

        <v-btn color="primary" class="mb-4" @click="openDialog">
            <v-icon left>mdi-plus</v-icon>
            Agregar Curso
        </v-btn>

        <v-data-table v-if="cursos.length > 0" :headers="tableHeaders" :items="cursos" item-key="id" class="elevation-1"
            item-class="course-row" dense
            :items-per-page="itemsPerPage"
            :footer-props="{
                'items-per-page-text': 'Cursos por página'
            }">
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.duracion }}</td>
                    <td>{{ item.costo }} CLP</td>
                    <td>{{ item.inscritos }}</td>
                    <td>{{ item.cupos }} / {{ item.inscritos }} inscritos</td>
                    <td>{{ item.descripcion }}</td>
                    <td class="text-center">
                        <v-btn icon @click="editCurso(item)" color="blue" class="mx-1">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteCurso(item.id)" color="red" class="mx-1">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <v-alert v-else type="info" dismissible>
            No hay cursos disponibles. Usa el botón "Agregar Curso" para crear uno nuevo.
        </v-alert>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ editMode ? "Editar Curso" : "Agregar Curso" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="cursoData.nombre" label="Nombre" required></v-text-field>
                        <v-text-field v-model="cursoData.duracion" label="Duración" required></v-text-field>
                        <v-text-field v-model="cursoData.costo" label="Costo" required></v-text-field>
                        <v-text-field v-model="cursoData.inscritos" label="Inscritos" required
                            :rules="[value => value <= cursoData.cupos || 'Los inscritos no pueden exceder los cupos disponibles']"></v-text-field>
                        <v-textarea v-model="cursoData.descripcion" label="Descripción" required></v-textarea>
                        <v-text-field v-model="cursoData.img" label="URL de Imagen" required></v-text-field>
                        <v-text-field v-model="cursoData.cupos" label="Cupos Disponibles" required
                            type="number"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="blue" @click="saveCurso">{{ editMode ? "Guardar" : "Crear" }}</v-btn>
                    <v-btn text color="red" @click="closeDialog">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: "Admin-list",
    data() {
        return {
            dialog: false, 
            valid: false, 
            editMode: false, 
            cursoData: {
                id: null,
                nombre: "",
                duracion: "",
                costo: "",
                inscritos: "",
                descripcion: "",
                img: "",
                cupos: "",
            },
            itemsPerPage: 5,
            tableHeaders: [
                { text: "Nombre", align: "start", key: "nombre" },
                { text: "Duración", align: "start", key: "duracion" },
                { text: "Costo", align: "start", key: "costo" },
                { text: "Inscritos", align: "start", key: "inscritos" },
                { text: "Cupos disponibles", align: "start", key: "cupos" },
                { text: "Descripción", align: "start", key: "descripcion" },
                { text: "Acciones", align: "center", key: "acciones" },
            ],
        };
    },
    computed: {
        cursos() {
            return this.$store.getters.getCursos; 
        },
    },
    methods: {
        openDialog() {
            this.resetForm();
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
        resetForm() {
            this.editMode = false;
            this.cursoData = {
                id: null,
                nombre: "",
                duracion: "",
                costo: "",
                inscritos: "",
                descripcion: "",
                img: "",
                cupos: "",
            };
        },
        editCurso(curso) {
            this.cursoData = { ...curso };
            this.editMode = true;
            this.dialog = true;
        },
        saveCurso() {
            if (this.valid) {
                if (this.editMode) {
                    this.$store.dispatch("updateCurso", this.cursoData);
                } else {
                    this.$store.dispatch("addCurso", this.cursoData);
                }
                this.closeDialog();
            }
        },
        deleteCurso(id) {
            this.$store.dispatch("deleteCurso", id);
        },
    },
    mounted() {
        this.$store.dispatch('fetchCursos');
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.v-data-table {
    margin-top: 20px;
}

.v-btn {
    margin-right: 10px;
}

.course-row td {
    font-size: 14px;
}

.v-data-table th {
    background-color: #f5f5f5;
    font-weight: bold;
}

.v-data-table .v-data-table__wrapper {
    max-height: 500px;
    overflow-y: auto;
}

.v-btn {
    border-radius: 50%;
    padding: 8px;
    transition: background-color 0.3s ease;
}

.v-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.v-btn.icon {
    min-width: 36px;
    min-height: 36px;
}
</style>
