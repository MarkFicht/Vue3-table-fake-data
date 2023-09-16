<script setup lang="ts">
import { ref, type Ref } from 'vue';
import TheUser from '@/components/TheUser.vue';
import { tableStore } from '@/store/tableStore';
import { storeToRefs } from 'pinia';

const headerAdd: Ref<string> = ref('Add user');
const headerEdit: Ref<string> = ref('Edit user');
const buttonPhoto = ref<string>('Change Photo');
const buttonUpdate = ref<string>('Update Details');

const firstName = ref<string>('First Name');
const lastName = ref<string>('Last Name');
const email = ref<string>('E-mail');

const tableDataStore = tableStore();
const { user } = storeToRefs(tableDataStore);
</script>

<template>
    <main>
        <header class="header">
            <h1>{{ user !== null ? headerEdit : headerAdd }}</h1>
        </header>
        <TheUser
            :buttonPhoto="buttonPhoto"
            :buttonUpdate="buttonUpdate"
            :firstName="firstName"
            :lastName="lastName"
            :email="email"
        />
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
