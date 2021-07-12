import {t} from 'testcafe';

import type {DeviceTokens, FullContext, Order, TestMeta, User} from '../types';

class Context {
  testController: TestController = t;

  /**
   * Get test metadata.
   */
  getMeta(): TestMeta {
    if (this.testController.ctx.meta === undefined) {
      this.testController.ctx.meta = {};
    }

    return this.testController.ctx.meta;
  }

  /**
   * Set test metadata.
   */
  setMeta(partialMeta: Partial<TestMeta>): void {
    if (this.testController.ctx.meta === undefined) {
      this.testController.ctx.meta = {};
    }

    Object.assign(this.testController.ctx.meta, partialMeta);
  }

  /**
   * Get DeviceTokens for next navigateToPage call.
   */
  getDeviceTokensForNextNavigate(): DeviceTokens | undefined {
    return this.testController.ctx.deviceTokensForNextNavigate;
  }

  /**
   * Set DeviceTokens for next navigateToPage call.
   */
  setDeviceTokensForNextNavigate(deviceTokens: DeviceTokens): void {
    this.testController.ctx.deviceTokensForNextNavigate = deviceTokens;
  }

  /**
   * Clear DeviceTokens for next navigateToPage call.
   */
  clearDeviceTokensForNextNavigate(): void {
    this.testController.ctx.deviceTokensForNextNavigate = undefined;
  }

  /**
   * Get current full test context.
   */
  getFullContext(): FullContext {
    return {
      meta: this.getMeta(),
      order: this.getOrder(),
      user: this.getUser(),
    };
  }

  /**
   * Get the current order, if any.
   */
  getOrder(): Order | undefined {
    return this.testController.ctx.order;
  }

  /**
   * Set the current order.
   */
  setOrder(order: Order): void {
    this.testController.ctx.order = order;
  }

  /**
   * Get the current signing in user, if any.
   */
  getUser(): User | undefined {
    return this.testController.ctx.user;
  }

  /**
   * Set the current signing in user (call it right before signing in).
   */
  setUser(user: User): void {
    this.testController.ctx.user = user;
  }
}

export const context = new Context();
