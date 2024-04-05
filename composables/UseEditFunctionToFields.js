import { useTeamsStore } from '~/stores/useTeamsStore';
import { useUserRoles } from '~/stores/useRolesStore'
import { usePermissionStore } from '~/stores/usePermissionsStore'

export const updateValues = (role, token, team, teamId) => {
  let updateCard;

  const teamStore = useTeamsStore();
  const roleStore = useUserRoles()
  const permissionStore = usePermissionStore()

  switch (role) {
    case 'team': {
      updateCard = async () => {
        try {
          await teamStore.updateTeamInfo(token, team, teamId);
        } catch (error) {
          console.error('Error updating team:', error.message);
          throw error;
        }
      };
      break;
    }
    case 'role' : {
      updateCard = async () => {
        try {
          await roleStore.updateRoleInfo(token, team, teamId);
        } catch (error) {
          console.error('Error updating team:', error.message);
          throw error;
        }
      };
      break;
    }
    case 'permission' : {
      updateCard = async () => {
        try {
          await permissionStore.updatePermissionInfo(token, team, teamId);
        } catch (error) {
          console.error('Error updating team:', error.message);
          throw error;
        }
      };
      break;
    }
    default: {
      updateCard = () => console.error('Unknown role:', role);
    }
  }

  return { updateCard };
};
