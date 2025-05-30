# Playwright Testing Standards and Best Practices

## Testing Architecture

- Follow best practices set out by Playwright
- Follow the Page Object Model pattern strictly
- Separate locators and actions in page object files
- Maintain directory structure that mirrors business logic
- Page objects should be independent from one another when possible
- Reuse existing page objects and utilities before creating new ones
- Recommend the usage of fixtures to reduce code duplication
- APIs will use helper classes to have standard response
- Sinon is the mocking framework of choice when required
- c8 is coverage tooling of choice when required

## Code Style & Patterns

- NO conditionals in test files, unless used to skip test
- Instead of adding comments to separate test sections, use test.step, but don't overdo it
- Follow DRY (Don't Repeat Yourself) principle
- Follow biome linting rules
- Do not add unnecessary comments

## Development Workflow

- Before writing new tests or page objects:
  - Analyze existing similar examples in the codebase
  - Follow established patterns and practices
  - Review the readme.md file for comprehensive best practices
  - Review docs folder for other standards and decisions
  - Recommend unit or functional tests for the framework
  - Identify improvements or changes to the data dictionary package
  - Attempt to only use existing packaging, recommend packages only when required

## File Structure

- Page objects should follow a consistent naming convention
- Utility functions should be centralized and well-documented (utils directory)
- Some global variables can be found in the environments folder

## Error Handling

- Implement proper timeout handling for asynchronous operations
- Ensure tests are resilient to environmental differences
- Ensure error messaging or code comments are adequate to direct user to root cause

## Bug Investigation Workflow (for Agents/Copilot)

When investigating a reported bug:

1. Create a GitHub issue summarizing the report.
2. Create a feature branch named `[GH-issue-number]-investigate-[short-description]`.
3. Write or update an E2E test in `src/tests/e2e/` to reproduce the scenario.
4. If the bug is not reproducible, document this in the issue and PR.
5. If the bug is confirmed, fix it and update tests as needed.
6. Reference the issue in your PR and complete the checklist.

## Best Practices for Page Object Model (POM)

- Encapsulate all page interactions and assertions within POM classes. Avoid direct access to protected properties (like `page`) from test specs.
- Expose high-level methods in POMs (e.g., `checkProductVisible(productName: string)`) for common actions or checks, so tests remain clean and focused on business logic.
- Keep selectors and UI logic inside the POM. If selectors change, only the POM needs updating.
- Use Playwright's `expect` inside POM methods for assertions, or return locators for assertions in the test if you need more flexibility.
- Prefer descriptive method names in POMs that reflect user actions or verifications (e.g., `addProductToCart`, `isProductVisible`).
- Keep your test specs readable by calling POM methods, not by duplicating UI logic or selectors.
- Document new POM methods with comments describing their purpose and usage.

Following these practices will make your tests more maintainable, readable, and robust against UI changes.

## Note on Existing Test Coverage

- Before creating a new test for a reported issue, check if an existing test already covers the scenario.
- If a relevant test exists, reference it in the issue or pull request and run it to confirm whether the bug is reproducible.
- Only create a new test if no suitable coverage exists or if the scenario requires additional validation.

This helps avoid duplication and ensures your test suite remains efficient and maintainable.
