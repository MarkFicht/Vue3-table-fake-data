import { defineStore } from 'pinia';
import type User from '@/interfaces/User';
import { getAllUsers } from '@/service/UserService';

interface State {
    loadListOnce: boolean;
    userList: User[];
    filterUserList: User[];
    displayedUserList: User[];
    filterInput: string;
    user: User | null;
    tableHeight: number;
    rowHeight: number;
    currentPage: number;
    numberOfRows: number;
    numberOfPages: number;
}

export const tableStore = defineStore('tableStore', {
    state: (): State => {
        return {
            loadListOnce: false,
            userList: [],
            filterUserList: [],
            displayedUserList: [],
            filterInput: '',
            user: null,
            tableHeight: 100,
            rowHeight: 50,
            currentPage: 1,
            numberOfPages: 0,
            numberOfRows: 0
        };
    },
    getters: {
        getUserById: (state) => {
            return (userId: number) => state.userList.find((user) => user.id === userId);
        }
    },
    actions: {
        async fetchAllUsers() {
            try {
                this.userList = (await getAllUsers()).data;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        refreshDataTable() {
            this.currentPage = 1;

            this.filterInput !== '' &&
                (this.filterUserList = this.userList.filter((data) =>
                    `${data.first_name} ${data.last_name}`
                        .toLowerCase()
                        .includes(`${this.filterInput.toLowerCase()}`)
                ));

            this.displayedUserList = (
                this.filterInput === '' ? this.userList : this.filterUserList
            ).slice(
                this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.numberOfRows,
                this.currentPage === 1 ? this.numberOfRows : this.currentPage * this.numberOfRows
            );

            this.numberOfPages = Math.ceil(
                this.filterInput === ''
                    ? this.userList.length / this.numberOfRows
                    : this.filterUserList.length / this.numberOfRows
            );
        },
        setSeletectedUser(userId: number) {
            this.user = this.userList.find((user) => user.id === userId) || null;
        },
        setUnseletectedUser() {
            this.user = null;
        },
        updateUser(updateUser: User) {
            let index: number | null = null;
            this.userList.find((user, i) => {
                return user.id === updateUser.id && (index = i);
            });
            index !== null && (this.userList[index] = updateUser);
        },
        setLoadListOnce() {
            this.loadListOnce = true;
        }
    }
});
