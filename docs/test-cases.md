---
id: test-cases
title: Test Cases
sidebar_label: Test Cases
description: Comprehensive test case documentation
---

# 🧪 Test Cases Documentation

This document provides detailed documentation of all test cases in the project.

## 📋 Test Suite Overview

| Suite | Description | Test Count | Status |
|-------|-------------|------------|--------|
| Login Tests | Authentication functionality | 4 | ✅ Complete |
| Inventory Tests | Product listing and details | 7 | ✅ Complete |
| Cart Tests | Shopping cart operations | 5 | ✅ Complete |
| Checkout Tests | Purchase flow | 6 | ✅ Complete |
| Logout Tests | Authentication logout | 3 | ✅ Complete |

---

## 🔐 Login Tests

### TC-LOGIN-001: Valid Credentials Login

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGIN-001 |
| **Priority** | P0 - Critical |
| **Preconditions** | User is on login page |
| **Steps** | 1. Enter valid username<br/>2. Enter valid password<br/>3. Click login button |
| **Expected Result** | User is redirected to inventory page |
| **Assertions** | URL contains '/inventory.html' |

### TC-LOGIN-002: Invalid Credentials Login

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGIN-002 |
| **Priority** | P0 - Critical |
| **Preconditions** | User is on login page |
| **Steps** | 1. Enter valid username<br/>2. Enter invalid password<br/>3. Click login button |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains credential mismatch text |

### TC-LOGIN-003: Empty Username Login

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGIN-003 |
| **Priority** | P1 - High |
| **Preconditions** | User is on login page |
| **Steps** | 1. Leave username empty<br/>2. Enter password<br/>3. Click login button |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains 'Username is required' |

### TC-LOGIN-004: Empty Password Login

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGIN-004 |
| **Priority** | P1 - High |
| **Preconditions** | User is on login page |
| **Steps** | 1. Enter username<br/>2. Leave password empty<br/>3. Click login button |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains 'Password is required' |

---

## 📦 Inventory Tests

### TC-INV-001: Verify all products are displayed

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-001 |
| **Priority** | P0 - Critical |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | All products are displayed |
| **Assertions** | Product count equals 6 |

### TC-INV-002: Sort products by name (A to Z)

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-002 |
| **Priority** | P1 - High |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | Products are sorted alphabetically |
| **Assertions** | Product order matches expected order |

### TC-INV-003: Sort products by name (Z to A)

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-003 |
| **Priority** | P1 - High |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | Products are sorted in reverse alphabetical order |
| **Assertions** | Product order matches expected order |

### TC-INV-004: Sort products by price (low to high)

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-004 |
| **Priority** | P1 - High |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | Products are sorted by price ascending |
| **Assertions** | Price order matches expected order |

### TC-INV-005: Sort products by price (high to low)

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-005 |
| **Priority** | P1 - High |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | Products are sorted by price descending |
| **Assertions** | Price order matches expected order |

### TC-INV-006: Add single product to cart

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-006 |
| **Priority** | P0 - Critical |
| **Preconditions** | User is on inventory page |
| **Expected Result** | Cart badge shows item count of 1 |
| **Assertions** | Cart badge text equals '1' |

### TC-INV-007: Add multiple products to cart

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-INV-007 |
| **Priority** | P0 - Critical |
| **Preconditions** | User is on inventory page |
| **Expected Result** | Cart badge updates to show item count |
| **Assertions** | Cart badge shows correct item count |

---

## 🛒 Cart Tests

### TC-CART-001: Cart displays added items correctly

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CART-001 |
| **Priority** | P0 - Critical |
| **Preconditions** | User has items in cart |
| **Expected Result** | Cart shows all added items |
| **Assertions** | Item names match added products |

### TC-CART-002: Remove item from cart

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CART-002 |
| **Priority** | P0 - Critical |
| **Preconditions** | Product is already in cart |
| **Expected Result** | Product is removed from cart |
| **Assertions** | Cart badge count decreases |

### TC-CART-003: Continue shopping returns to inventory

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CART-003 |
| **Priority** | P1 - High |
| **Preconditions** | User is on cart page |
| **Expected Result** | User returns to inventory page |
| **Assertions** | URL contains '/inventory.html' |

### TC-CART-004: Proceed to checkout

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CART-004 |
| **Priority** | P0 - Critical |
| **Preconditions** | User has items in cart |
| **Expected Result** | User navigates to checkout step one |
| **Assertions** | URL contains '/checkout-step-one.html' |

### TC-CART-005: Cart badge shows correct count

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CART-005 |
| **Priority** | P1 - High |
| **Preconditions** | User has items in cart |
| **Expected Result** | Cart badge shows correct item count |
| **Assertions** | Badge count matches items in cart |

---

## 💳 Checkout Tests

### TC-CHECKOUT-001: Complete checkout successfully

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-001 |
| **Priority** | P0 - Critical |
| **Preconditions** | User has items in cart and is on checkout step one |
| **Expected Result** | Order is completed successfully |
| **Assertions** | Success message 'Thank you for your order!' is displayed |

### TC-CHECKOUT-002: Error when first name is empty

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-002 |
| **Priority** | P1 - High |
| **Preconditions** | User is on checkout step one |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains 'First Name is required' |

### TC-CHECKOUT-003: Error when last name is empty

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-003 |
| **Priority** | P1 - High |
| **Preconditions** | User is on checkout step one |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains 'Last Name is required' |

### TC-CHECKOUT-004: Error when postal code is empty

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-004 |
| **Priority** | P1 - High |
| **Preconditions** | User is on checkout step one |
| **Expected Result** | Error message is displayed |
| **Assertions** | Error message contains 'Postal Code is required' |

### TC-CHECKOUT-005: Cancel checkout returns to cart

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-005 |
| **Priority** | P2 - Medium |
| **Preconditions** | User is on checkout step one |
| **Expected Result** | User returns to cart page |
| **Assertions** | URL contains '/cart.html' |

### TC-CHECKOUT-006: Checkout summary is displayed correctly

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-CHECKOUT-006 |
| **Priority** | P1 - High |
| **Preconditions** | User has completed checkout step one |
| **Expected Result** | Checkout summary shows all items and totals |
| **Assertions** | Summary information is visible |

---

## 🔓 Logout Tests

### TC-LOGOUT-001: Logout returns to login page

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGOUT-001 |
| **Priority** | P1 - High |
| **Preconditions** | User is logged in and on inventory page |
| **Expected Result** | User is redirected to login page |
| **Assertions** | URL is 'https://www.saucedemo.com/' and username field is visible |

### TC-LOGOUT-002: Cannot access inventory after logout

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGOUT-002 |
| **Priority** | P1 - High |
| **Preconditions** | User has logged out |
| **Expected Result** | User is redirected to login |
| **Assertions** | Login page is displayed |

### TC-LOGOUT-003: Can login again after logout

| Attribute | Value |
|-----------|-------|
| **Test ID** | TC-LOGOUT-003 |
| **Priority** | P1 - High |
| **Preconditions** | User has logged out |
| **Expected Result** | User is redirected to inventory page |
| **Assertions** | URL contains '/inventory.html' |

---

## 📊 Test Execution Summary

| Category | Count |
|----------|-------|
| Total Tests | 25 |
| Login Tests | 4 |
| Inventory Tests | 7 |
| Cart Tests | 5 |
| Checkout Tests | 6 |
| Logout Tests | 3 |
