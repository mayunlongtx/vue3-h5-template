import { reactive } from 'vue';
import { defineStore } from 'pinia';
export interface SkillStateType {
  name: string | number;
  intervalTime: number;
  unit: string;
}
export const useRoleSkillStore = defineStore('useROleSkillStore', () => {
  const skillState = reactive<SkillStateType>({
    name: '法术1',
    intervalTime: 10,
    unit: 'S',
  });
  function setKill(data: SkillStateType) {
    Object.assign(skillState, data);
  }
  return { skillState, setKill };
});
