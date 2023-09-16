<script setup lang="ts">
import { RouterLink } from 'vue-router';
import IconLoupe from '@/components/icons/IconLoupe.vue';
import IconXmark from '@/components/icons/IconXmark.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { storeToRefs } from 'pinia';
import { tableStore } from '@/store/tableStore';

const tableDataStore = tableStore();
const { filterInput } = storeToRefs(tableDataStore);

const props = defineProps({
    placeHolder: String,
    buttonName: String
});
</script>

<template>
    <section class="section-card-panel">
        <div class="input">
            <input
                type="text"
                name=""
                id=""
                :placeholder="props.placeHolder"
                v-model="filterInput"
            />
            <button v-if="filterInput.length === 0" class="filter-button" type="button">
                <i class="input-icon"><IconLoupe /></i>
            </button>
            <button v-else class="filter-button" type="button" @click="filterInput = ''">
                <i class="input-icon"><IconXmark /></i>
            </button>
        </div>
        <RouterLink class="add-user" to="/add-user">
            <i><IconPlus /></i>{{ props.buttonName }}
        </RouterLink>
    </section>
</template>

<style scoped>
.section-card-panel {
    border-bottom: 1px solid var(--color-background-grey);
    display: flex;
    justify-content: space-between;
    align-items: start;
    height: 60px;
}
.input-icon {
    color: #666;
}
.section-card-panel input[type='text'] {
    background-color: var(--color-background-grey);
    border: none;
    outline: none;
    color: #666;
    font-weight: 600;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    width: 350px;
    padding: 0 30px 0 10px;
    border-radius: 3px;
}
.input {
    position: relative;
}
.filter-button {
    position: absolute;
    padding-top: 2px;
    color: #666;
    top: 0;
    right: 10px;
    height: 30px;
    line-height: 30px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}
.input-icon {
    color: #666;
}
.add-user {
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    width: 110px;
    padding: 0 10px;
    border-radius: 25px;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-user i {
    padding-top: 4px;
    padding-right: 10px;
}
.add-user:hover {
    background-color: hsla(160, 100%, 37%, 0.75);
}
@media (max-width: 680px) {
    .section-card-panel input[type='text'] {
        width: 250px;
    }
    .add-user {
        font-size: 12px;
        width: 80px;
    }
    .add-user i {
        display: none;
    }
}
@media (max-width: 480px) {
    .section-card-panel input[type='text'] {
        width: 140px;
        font-size: 12px;
    }
    .filter-button {
        right: 3px;
    }
}
@media (max-width: 350px) {
    .section-card-panel {
        flex-wrap: wrap;
        justify-content: center;
        height: 100px;
    }

    .section-card-panel input[type='text'] {
        width: 100%;
    }
}
</style>
