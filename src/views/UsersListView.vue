<script setup lang="ts">
import { ref, type Ref } from 'vue';

import TheTable from '@/components/TheTable.vue';
import TableFilters from '@/components/TableFilters.vue';
import TableUsers from '@/components/TableUsers.vue';
import TablePagination from '@/components/TablePagination.vue';

const header: Ref<string> = ref('User list');
const placeHolder: Ref<string> = ref('Search for users...');
const buttonName: Ref<string> = ref('Add User');
const colName = ref<string>('Full Name');
const colAction = ref<string>('Action');
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ header }}</h1>
        </header>
        <TheTable>
            <template #tableFilters>
                <TableFilters :placeHolder="placeHolder" :buttonName="buttonName" />
            </template>
            <template #tableUsers>
                <TableUsers :colName="colName" :colAction="colAction" />
            </template>
            <template #tablePagination>
                <TablePagination />
            </template>
        </TheTable>
    </main>
</template>

<style scoped>
.header {
    height: 50px;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
}
h1 {
    font-weight: 400;
    font-size: 2.1rem;
    color: #444;
}

@media (max-width: 1024px) {
    .header {
        margin-top: 30px;
        text-align: center;
    }
}
@media (max-width: 680px) {
    .header {
        margin-top: 0px;
        text-align: center;
    }
}
</style>
