/* eslint-disable no-undef */
import { defineStore } from "pinia";
import { USER_ME } from "~/constants/apiCalls";
import { BASE_URL } from "~/constants/apiCalls";


export const useUserInfo = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    //Function to get user (skip errror handling)
   async fetchUserInfo(token) {
      try {
        const response = await fetch(USER_ME, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = await response.json();
          this.user = data.user;

      } catch (error) {
        console.error("Ошибка:", error.message);
        throw error;
      }
    },
     //Function to assign permission to user (skip errror handling)
    async assignPermission(token, permissionsId) {
      const permissions = []
      permissions.push(`${permissionsId}`)
      try {
        await $fetch(`${BASE_URL}/users/${this.user.id}/assign-permissions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {permissions} )
        });
        await this.fetchUserInfo()
      } catch (error) {
        console.error("Ошибка:", error.message);
        throw error;
      }
    },
    //Function to assign role to user (skip errror handling)
    async assignRole(token, roleId) {
      const roles= []
      roles.push(`${roleId}`)
      try {
        await fetch(`${BASE_URL}/users/${this.user.id}/assign-roles`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({roles})
        });
        await this.fetchUserInfo(token)
      } catch (error) {
        console.error("Ошибка:", error.message);
        throw error;
      }
    },
  }
});
