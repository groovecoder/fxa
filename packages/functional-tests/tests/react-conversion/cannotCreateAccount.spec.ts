import { test, expect } from '../../lib/fixtures/standard';
import { BaseTarget } from '../../lib/targets/base';

function getReactFeatureFlagUrl(target: BaseTarget, path: string) {
  return `${target.contentServerUrl}${path}?showReactApp=true`;
}

test.describe('react-conversion', () => {
  test('Cannot create account', async ({ page, target }) => {
    await page.goto(getReactFeatureFlagUrl(target, '/cannot_create_account'));
    expect(await page.locator('#root').isVisible()).toBeTruthy();
  });
});
