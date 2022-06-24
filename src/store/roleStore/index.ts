import { defineStore } from 'pinia';
import { useRoleSkillStore } from './roleSkill';

export const roleStore = defineStore('roleStore', () => {
  const skill = useRoleSkillStore();
  function changeProfession(data: any) {
    skill.setKill(data.kill);
  }
  return { skill, changeProfession };
});
