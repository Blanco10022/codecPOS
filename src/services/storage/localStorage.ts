import { Storage } from '../database';

export const setItem = async (key: string, value: string): Promise<void> => {
  await Storage.upsert({ key, value });
};

export const getItem = async (key: string): Promise<string | null> => {
  const item = await Storage.findByPk(key);
  return item ? item.value : null;
};

export const removeItem = async (key: string): Promise<void> => {
  await Storage.destroy({ where: { key } });
};

export const clear = async (): Promise<void> => {
  await Storage.destroy({ where: {} });
};