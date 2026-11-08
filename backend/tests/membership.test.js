const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getPublicMembershipPlans,
} = require('../src/config/membershipPlans');
const {
  addCalendarMonth,
} = require('../src/utils/dates');

test('publishes the two proposed monthly membership plans', () => {
  const plans = getPublicMembershipPlans();

  assert.equal(plans.length, 2);
  assert.deepEqual(
    plans.map((plan) => [plan.id, plan.monthlyPrice, plan.currency, plan.billingInterval]),
    [
      ['discount_monthly', 20, 'USD', 'month'],
      ['daily_dish_monthly', 500, 'USD', 'month'],
    ]
  );

  for (const plan of plans) {
    assert.equal(plan.pricingStatus, 'tentative_pending_final_approval');
  }
});

test('adds one calendar month and clamps month-end dates', () => {
  const start = new Date(2026, 0, 31, 12, 30, 0);
  const result = addCalendarMonth(start);

  assert.equal(result.getFullYear(), 2026);
  assert.equal(result.getMonth(), 1);
  assert.equal(result.getDate(), 28);
  assert.equal(result.getHours(), 12);
  assert.equal(result.getMinutes(), 30);
});

test('supports leap-year February', () => {
  const start = new Date(2028, 0, 31, 9, 0, 0);
  const result = addCalendarMonth(start);

  assert.equal(result.getFullYear(), 2028);
  assert.equal(result.getMonth(), 1);
  assert.equal(result.getDate(), 29);
});

test('rejects invalid dates', () => {
  assert.throws(
    () => addCalendarMonth('not-a-date'),
    /valid date/i
  );
});
