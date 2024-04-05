/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { ROLE } from '~/constants/apiCalls'
import { BASE_URL } from '~/constants/apiCalls';

export const useUserRoles = defineStore({
  id: 'role',
  state: () => ({
    roles: []
  }),
  actions: {
    async fetchRoles(token) {
      try {
        if (!token) {
          throw new Error('Отсутствует токен аутентификации');
        }

        const response = await fetch(ROLE, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { data } = await response.json();
        this.roles = data
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    },
    async postRole(token, role) {
      try {
        await fetch(ROLE, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(role)
        });
        await this.fetchRoles(token);
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    },
    async deleteRole(token, id){
      try {
        // eslint-disable-next-line no-undef
        await $fetch(`${ROLE}${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    },
    async updateRolePermissions(token ,permissions, roleId) {
      try {
        await $fetch(`${BASE_URL}/roles/${roleId}/permissions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({permissions})
        });
        await this.fetchRoles(token);
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }

    },
    async updateRoleInfo (token,team , teamId) {
      try {
        await $fetch(`${ROLE}${teamId}`, {
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
})
