/* eslint-disable no-undef */
import { defineStore } from "pinia";
import { PERMISSION } from '~/constants/apiCalls';

export const usePermissionStore = defineStore({
  id: "permissons",
  state: () => ({
    permissons: null,
  }),
  actions: {
    async fetchPermission(token) {
      try {
        if (!token) {
          throw new Error('Отсутствует токен аутентификации');
        }

        const response = await fetch(PERMISSION, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Ошибка при получении защищенного ресурса');
        }
        const { data } = await response.json();
        this.permissons  = data
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    },
    async postPermissiom(permission, token) {
      try {
        await $fetch(PERMISSION, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: permission
        });
        this.fetchPermission(token)
      } catch (error) {
        console.error('Ошибка:', error.message);
      }
    },
    async deletePermission(index, token) {
      try {
          await fetch(`${PERMISSION}${index}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
      this.fetchPermission(token)
      }
      catch (error) {
        console.error(error);
      }
    },
    async updatePermissionInfo (token,team , teamId) {
      try {
        await $fetch(`${PERMISSION}${teamId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(team)
        });
        await this.fetchTeams(token);
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    }
  }
});