<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { tableStore } from '@/store/tableStore';

const tableDataStore = tableStore();
const { currentPage, numberOfPages } = storeToRefs(tableDataStore);

function changeCurrentPage(id: number): any {
    currentPage.value = id;
}
</script>

<template>
    <section class="section-pagination">
        <button class="prev" :disabled="currentPage <= 1" @click="currentPage = 1">
            {{ '<<' }}
        </button>
        <button
            v-for="number in numberOfPages"
            :key="number"
            :class="[`page`, currentPage === number && `active`]"
            @click="changeCurrentPage(number)"
        >
            {{ number }}
        </button>
        <button
            class="next"
            :disabled="currentPage >= numberOfPages"
            @click="currentPage = numberOfPages"
        >
            {{ '>>' }}
        </button>
    </section>
</template>

<style scoped>
.section-pagination {
    height: 40px;
    width: 100%;
    margin-top: 20px;
}
.section-pagination button {
    border: 1px solid #dedede;
    border-left: none;
    height: 40px;
    width: 40px;
    background-color: #fff;
    color: hsla(160, 100%, 37%, 0.75);
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    outline: none;
    display: block;
    float: left;
    cursor: pointer;
}
.section-pagination button.active {
    color: #fff;
    background-color: hsla(160, 100%, 37%, 0.75);
    cursor: default;
}
.section-pagination button:disabled {
    cursor: not-allowed;
    color: #dedede;
}
.section-pagination button:first-child {
    border-left: 1px solid #dedede;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-size: 12px;
}
.section-pagination button:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    font-size: 12px;
}
@media (max-width: 1024px) {
    .section-pagination {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
}
</style>
