const dayjs = require('dayjs');

const advancedFormat = require('dayjs/plugin/advancedFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
