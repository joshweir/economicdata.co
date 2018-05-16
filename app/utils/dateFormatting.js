import { MONTH_NAMES } from '../../app/modules/masterData/actions';

export const formatReleaseDate = (releaseDate) => {
  const dt = new Date(releaseDate);
  return `${MONTH_NAMES[dt.getUTCMonth()]} ` +
    `${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
};

export const formatReleaseTime = (releaseDate) => {
  const dt = new Date(releaseDate);
  const h = dt.getUTCHours();
  const m = dt.getUTCMinutes();
  return h <= 0 && m <= 0 ?
    null : `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
};
