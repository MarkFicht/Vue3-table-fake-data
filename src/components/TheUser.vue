<script lang="ts">
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { tableStore } from '@/store/tableStore';
import IconCamera from '@/components/icons/IconCamera.vue';

import useValidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import type User from '@/interfaces/User';

export default {
    components: {
        IconCamera
    },
    props: {
        buttonPhoto: String,
        buttonUpdate: String,
        firstName: String,
        lastName: String,
        email: String
    },
    setup(props) {
        const tableDataStore = tableStore();
        const { userList, user } = storeToRefs(tableDataStore);

        let prepareState;
        if (user !== null) {
            prepareState = {
                firstName: user.value?.first_name || '',
                lastName: user.value?.last_name || '',
                email: user.value?.email || '',
                avatar: user.value?.avatar || ''
            };
        } else {
            prepareState = {
                firstName: '',
                lastName: '',
                email: '',
                avatar: ''
            };
        }
        const state = reactive(prepareState);

        const rules = reactive({
            firstName: { required, minLength: minLength(3) },
            lastName: { required, minLength: minLength(3) },
            email: {
                required,
                email,
                unique: helpers.withAsync(async (val: string) => {
                    if (val.trim().length === 0) return true;
                    if (user?.value) return true;

                    let isUnique = true;

                    new Promise<boolean>((resolve, reject) => {
                        try {
                            userList.value.find((user) => {
                                if (user.email === val) {
                                    isUnique = false;
                                    return true;
                                }
                                return false;
                            });
                            resolve(isUnique);
                        } catch (error) {
                            reject(error);
                        }
                    });

                    // const emailRegex =
                    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    return isUnique
                        ? isUnique
                        : {
                              $valid: isUnique,
                              $message: 'Email is already exists',
                              $pending: false
                          };
                })
            },
            avatar: {}
        });

        const v$ = useValidate(rules, state);

        const refImageInput = ref<any | null>(null);

        return {
            state,
            v$,
            userList,
            user,
            refImageInput
        };
    },
    mounted() {
        this.refImageInput.addEventListener('change', () => {
            this.state.avatar = URL.createObjectURL(this.refImageInput.files[0]);
        });
    },
    methods: {
        submitForm(e: PointerEvent) {
            e.preventDefault();

            this.v$.$validate();
            if (!this.v$.$error) {
                if (this.user === null) {
                    let id = 1;
                    this.userList.forEach((user) => {
                        user.id > id && (id = user.id);
                    });
                    id++;

                    // SIMULATION ADD ACTION
                    const newUser: User = {
                        id: id,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        avatar: this.state.avatar
                    };

                    this.userList.push(newUser);
                } else {
                    // SIMULATION EDIT ACTION
                    const newUser: User = {
                        id: this.user.id,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        avatar: this.state.avatar
                    };

                    let index: number | null = null;
                    this.userList.find((user, i) => {
                        return user.id === newUser.id && (index = i);
                    });
                    index !== null && (this.userList[index] = newUser);
                }

                this.$router.push('/');
            } else {
                return;
            }
        }
    }
};
</script>

<template>
    <form class="section-wrapper">
        <section class="section-card section-card-left">
            <div class="user-details">
                <div class="first-name">
                    <label for="first-name">{{ firstName }}</label>
                    <input
                        type="text"
                        id="first-name"
                        :placeholder="`${firstName}...`"
                        v-model="state.firstName"
                    />
                    <span v-if="v$.firstName.$error"> {{ v$.firstName.$errors[0].$message }}</span>
                </div>

                <div class="last-name">
                    <label for="last-name">{{ lastName }}</label>
                    <input
                        type="text"
                        id="last-name"
                        :placeholder="`${lastName}...`"
                        v-model="state.lastName"
                    />
                    <span v-if="v$.lastName.$error"> {{ v$.lastName.$errors[0].$message }}</span>
                </div>

                <div class="email">
                    <label for="email">{{ email }}</label>
                    <input
                        type="text"
                        id="email"
                        :placeholder="`${email}...`"
                        v-model="state.email"
                    />
                    <span v-if="v$.email.$error">
                        {{
                            v$.email.$errors[0]?.$message || v$.email.$errors[0]?.$response.$message
                        }}</span
                    >
                </div>
            </div>
            <div class="button">
                <button
                    class="button-update"
                    type="submit"
                    @click="(e) => submitForm(e as PointerEvent)"
                >
                    {{ buttonUpdate }}
                </button>
            </div>
        </section>

        <section class="section-card section-card-right">
            <div class="user-photo">
                <div
                    class="avatar"
                    :style="state.avatar && `background-image: url(${state.avatar})`"
                ></div>
            </div>
            <label class="photo-upload">
                <i class="button-icon"><IconCamera /></i>
                <p>{{ buttonPhoto }}</p>
                <input ref="refImageInput" type="file" accept="image/png, image/jpeg" />
            </label>
        </section>
    </form>
</template>

<style scoped>
.section-wrapper {
    display: grid;
    grid-template-columns: 6fr 3fr;
    column-gap: 30px;
}
.section-card {
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 20px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 15px -10px rgba(66, 68, 90, 1);
    height: 330px;
    display: grid;
    row-gap: 40px;
    grid-template-rows: 1fr 35px;
}
label {
    font-size: 13px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
}
input {
    margin: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 2px 10px;
    border: 1px solid #b4b4b4;
    border-radius: 3px;
    color: #747474;
    outline: none;
    background-color: transparent;
}
span {
    font-size: 12px;
    margin-left: 10px;
    padding: 0;
    color: tomato;
}
.user-details {
    margin-top: 30px;
    display: grid;
    gap: 0 30px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

.email {
    grid-column: 1 / 2;
}
.user-photo {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.avatar {
    background-image: url('../assets/defaultUser.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 143px;
    width: 143px;
    border-radius: 50%;
    border: 1px solid #666;
}

.section-card button {
    height: 30px;
    width: 100%;
    background-color: transparent;
    height: 35px;
    line-height: 35px;
    border-radius: 3px;
    transition: all 0.3s;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}
button.button-update {
    background-color: hsla(160, 100%, 37%, 1);
    color: #fff;
    width: 130px;
    padding: 0 10px;
}
button.button-update:hover {
    background-color: hsla(160, 100%, 37%, 0.75);
}
input[type='file'] {
    display: none;
}
.photo-upload {
    border: 1px solid #666;
    color: #666;
    height: 35px;
    line-height: 33px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
    transition: 0.3s all;
    font-weight: 400;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.photo-upload:hover {
    background-color: #efefef;
}
.photo-upload i {
    padding-top: 2px;
    padding-right: 7px;
}
.photo-upload p {
    margin: 0;
    padding: 0;
}
@media (max-width: 1024px) {
    .user-details {
        gap: 0 10px;
    }
}
@media (max-width: 924px) {
    .user-details {
        margin-top: 5px;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr 1fr 1fr;
    }

    .section-card-left {
        row-gap: 0;
    }
}
@media (max-width: 800px) {
    .section-wrapper {
        grid-template-columns: 3fr 2fr;
    }
}
@media (max-width: 600px) {
    .section-wrapper {
        grid-template-columns: 1fr;
        row-gap: 30px;
    }

    .section-card-left {
        grid-row: 2;
    }
}
@media (max-width: 360px) {
    .section-card {
        padding: 20px 10px;
    }

    .section-card-left {
        height: unset !important;
        min-height: 330px;
    }
}
</style>
