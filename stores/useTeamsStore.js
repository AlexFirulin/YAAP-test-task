/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { TEAMS } from '~/constants/apiCalls'

export const useTeamsStore = defineStore({
  id: 'teams',
  state: () => ({
    teams: []
  }),
  actions: {
    async fetchTeams(token) {
      try {
        if (!token) {
          throw new Error('Отсутствует токен аутентификации');
        }

        const response = await fetch(TEAMS, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { data } = await response.json();
        this.teams = data
      } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
      }
    },
    async deleteTeam(token, id) {
      try {
        await fetch(`${TEAMS}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.fetchTeams(token)
      } catch(error) {
        console.error(error)
      }

    },
    async createTeam(team, token) {
      try {
        await $fetch(`${TEAMS}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(team)
        });
        await this.fetchTeams(token)
      } catch(error) {
        console.error(error)
      }
    },
    async selectTeam(token, team) {
      try {
        await fetch(TEAMS, {
          method: 'POST',
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
    },
    async updateTeamInfo(token,team , teamId) {
      try {
        await $fetch(`${TEAMS}/${teamId}`, {
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
