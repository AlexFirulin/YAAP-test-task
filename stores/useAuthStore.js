import { defineStore } from "pinia";
import { LOGIN_URL } from "~/constants/apiCalls";
import { LOGOUT } from '~/constants/apiCalls';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {},
    token:'',
  }),
  actions: {
    async login(credentials) {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка аутентификации');
      }

      const { data } = await response.json();
      this.user = data.user;
      this.token = data.token;
      document.cookie = `token=${data.token}; path=/`;
    },
    async logout(token) {
      try {
        await fetch(LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: { all_devices: true}
        });
        token.value = null
        return true;
      } catch (error) {
        console.error('Произошла ошибка при выходе из системы:', error);
        return false;
      }
    }
  }

});