const MEMBERSHIP_PLANS = Object.freeze([
  {
    id: 'discount_monthly',
    name: 'Discount Membership',
    monthlyPrice: 20,
    currency: 'USD',
    billingInterval: 'month',
    description: 'Monthly membership with access to discounted menu pricing.',
    benefitType: 'discounted_menu',
    benefitDetails: {
      discountRate: null,
      eligibleItems: null,
    },
    active: true,
  },
  {
    id: 'daily_dish_monthly',
    name: 'Daily Dish Membership',
    monthlyPrice: 500,
    currency: 'USD',
    billingInterval: 'month',
    description: 'Monthly membership including one dish per day.',
    benefitType: 'daily_dish',
    benefitDetails: {
      dishesPerDay: 1,
      eligibleItems: null,
      serviceMode: null,
    },
    active: true,
  },
]);

function getMembershipPlan(planId) {
  return MEMBERSHIP_PLANS.find(
    (plan) => plan.id === planId && plan.active
  ) || null;
}

function getPublicMembershipPlans() {
  return MEMBERSHIP_PLANS
    .filter((plan) => plan.active)
    .map((plan) => ({
      id: plan.id,
      name: plan.name,
      monthlyPrice: plan.monthlyPrice,
      currency: plan.currency,
      billingInterval: plan.billingInterval,
      description: plan.description,
      benefitType: plan.benefitType,
      benefitDetails: plan.benefitDetails,
    }));
}

module.exports = {
  MEMBERSHIP_PLANS,
  getMembershipPlan,
  getPublicMembershipPlans,
};
