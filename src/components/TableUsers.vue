<script setup lang="ts">
// import { type PropType } from 'vue';
// import type User from '@/interfaces/User';
import { OrbitSpinner } from 'epic-spinners';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';

import { storeToRefs } from 'pinia';
import { tableStore } from '@/store/tableStore';
import router from '@/router';
import type User from '@/interfaces/User';

// ---
defineProps<{
    colName: string;
    colAction: string;
    // displayedUserList: { type: Array as PropType<User[]>, required: true }
    // displayedUserList: User[]
}>();

const tableDataStore = tableStore();
const { userList, displayedUserList } = storeToRefs(tableDataStore);

const selectUser = (id: number): any => {
    tableDataStore.setSeletectedUser(id);
    router.push('/edit-user');
};

const deleteUser = (user: User): any => {
    if (
        confirm(
            `Are you sure you want to delete: ${user.first_name} ${user.last_name} (${user.email})?`
        )
    ) {
        const index = userList.value.indexOf(user);
        userList.value.splice(index, 1);
        tableDataStore.refreshDataTable();
    }
};
</script>

<template>
    <section ref="refWrapperTable" class="wrapper-table">
        <table class="custom-table">
            <thead>
                <tr>
                    <th></th>
                    <th>{{ colName }}</th>
                    <th>{{ colAction }}</th>
                </tr>
            </thead>
            <tbody v-if="displayedUserList?.length !== 0">
                <tr v-for="user in displayedUserList" :key="user.id">
                    <td class="avatar">
                        <div>
                            <div
                                :style="user.avatar && `background-image: url(${user.avatar})`"
                            ></div>
                        </div>
                    </td>
                    <td>{{ `${user.first_name} ${user.last_name}` }}</td>
                    <td>
                        <div class="actions">
                            <button @click="selectUser(user.id)">
                                <i><IconEdit /></i>
                            </button>
                            <button @click="deleteUser(user)">
                                <i><IconTrash /></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td :colspan="3" style="position: relative">
                        <OrbitSpinner
                            style="
                                position: absolute;
                                top: 0;
                                left: 50%;
                                transform: translate(-50%, 5px);
                            "
                            :animation-duration="1200"
                            :size="40"
                            color="hsla(160, 100%, 37%, 1)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.wrapper-table {
    min-height: 101px;
    max-height: calc(100vh - 370px);
    height: 100%;
    overflow-y: hidden;
}
table.custom-table {
    background-color: #fff;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin-top: 10px;
}
table.custom-table thead {
    background: #fff;
}
table.custom-table thead th {
    font-size: 13px;
    font-weight: bold;
    color: #444;
    text-align: left;
    border-left: 2px solid #d0e4f5;
    height: 40px;
}
table.custom-table thead th:first-child {
    border-left: none;
    width: 100px;
}
table.custom-table thead th:nth-child(2) {
    border-left: none;
    width: calc(100% - 200px);
    min-width: 120px;
}
table.custom-table thead th:nth-child(3) {
    border-left: none;
    width: 100px;
}
.avatar div {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 40px;
    width: 40px;
    margin-left: 10px;
    border-radius: 50%;
}
.avatar > div {
    background-image: url('../assets/defaultUser.jpg');
}
.avatar > div > div {
    margin-left: 0;
}
.actions button {
    border: none;
    height: 15px;
    width: 15px;
    background-color: transparent;
    line-height: 24px;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    margin-right: 8px;
    padding: 0;
    outline: none;
    display: block;
    float: left;
    cursor: pointer;
}

.actions i {
    color: #aaa;
    display: flex;
}
table.custom-table tbody td {
    font-size: 13px;
    height: 50px;
}
table.custom-table tbody tr:hover,
table.custom-table tbody tr:focus {
    background-color: hsla(160, 100%, 37%, 0.2) !important;
}
table.custom-table tbody tr:nth-child(odd) {
    background: var(--color-background-grey);
}
table.custom-table tbody tr td:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}
table.custom-table tbody tr td:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
@media (max-width: 680px) {
}
@media (max-width: 350px) {
    .wrapper-table {
        min-height: 181px;
        max-height: calc(100vh - 415px);
    }
}
</style>
