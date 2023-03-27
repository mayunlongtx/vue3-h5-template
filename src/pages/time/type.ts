export interface ConfigType {
  startTime?: Date | string;
  startHour?: number;
  endHour?: number;
  interval?: number;
  afterNumber?: number;
}

interface ItemCommonType {
  id?: string | number;
  text?: string;
  pId?: string | number;
}

export interface ItemType extends ItemCommonType {
  time?: string;
}

export interface DaysItemType extends ItemType {
  children?: ItemType[];
}
