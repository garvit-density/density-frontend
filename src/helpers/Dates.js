export const epochToDateConvertor = (date) => new Date(Number(date)).toLocaleString();

export const dateStringConvertor = (date) => String(date).replace(/\//g, ".");

export const dateToEpochConvertor = (dates) => Math.floor(new Date(dates).getTime() / 1000);
