import { CronJob } from 'cron';

export const startCronjobs = () => {
    const monthlyBillingCron = new CronJob('*/2 * * * * *', monthlyBilling);
    const nonVegMealCron = new CronJob('*/5 * * * * *', nonVegMeal);
    const profileDeactivationCron = new CronJob('*/5 * * * * *', profileDeactivation);

    monthlyBillingCron.start();
    nonVegMealCron.start();
    profileDeactivationCron.start();
}

const monthlyBilling = () => {
    console.log("monthly billing");
}

const nonVegMeal = () => {
    console.log("monthly billing");
}

const profileDeactivation = () => {
    console.log("profile");
}